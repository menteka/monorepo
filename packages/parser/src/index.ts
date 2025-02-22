import type { FeedItem, Metadata, SupportedFormat } from "./types";
import { getTextContent, parseDate, getAtomLink, extractUrls } from "./util";

type ParseConfig = { processItems: boolean };

const defaultConfig: ParseConfig = { processItems: true };

//TODO: Add logic for detecting all links on a page, put them on a neat list.

export class FeedParser {
  private static readonly RSS_NAMESPACES = {
    CONTENT: "http://purl.org/rss/1.0/modules/content/",
    DC: "http://purl.org/dc/elements/1.1/",
  };

  format: SupportedFormat | undefined;

  /**
   * Parse RSS or Atom feed XML string into a structured object
   */
  public parse(xmlString: string, config: ParseConfig = defaultConfig) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");
    this.captureFormat(xmlDoc);

    if (!this.format) {
      console.log(xmlString);
      throw new Error("Invalid feed format: Neither RSS nor Atom detected");
    }

    const feed = this.getFeed(xmlDoc);
    if (!feed) {
      throw new Error("Invalid feed format: Neither RSS nor Atom detected");
    }

    const metadata: Metadata = {
      title: this.getTitle(feed),
      description: this.getDescription(feed),
      lastUpdated: this.getLastUpdated(feed),
      language: this.getLanguage(feed),
      link: this.getLink(feed),
    };

    const items: FeedItem[] = config.processItems
      ? this.getItems(xmlDoc)?.map((item) => this.mapItem.call(this, item))
      : [];

    return { metadata, items };
  }

  private captureFormat(xmlDoc: Document) {
    if (xmlDoc.querySelector("rss, rdf\\:RDF")) this.format = "RSS";
    if (xmlDoc.querySelector("feed")) this.format = "Atom";
  }

  private getFeed(xmlDoc: Document) {
    switch (this.format) {
      case "Atom":
        return xmlDoc.querySelector("feed");
      case "RSS":
        return xmlDoc.querySelector("channel");
    }
  }

  private getItems(xmlDoc: Document) {
    switch (this.format) {
      case "Atom":
        return Array.from(xmlDoc.querySelectorAll("entry"));
      case "RSS":
        return Array.from(xmlDoc.querySelectorAll("item"));
    }
  }

  /* -- Methods concerning feed metadata -- */

  private getTitle(feed: Element) {
    return getTextContent(feed, "title");
  }

  private getDescription(feed: Element) {
    switch (this.format) {
      case "Atom":
        return getTextContent(feed, "subtitle");
      case "RSS":
        return getTextContent(feed, "description");
    }
  }

  private getCopyright(feed: Element) {
    switch (this.format) {
      case "Atom":
        return getTextContent(feed, "rights");
      case "RSS":
        return getTextContent(feed, "copyright");
    }
  }

  private getLastUpdated(feed: Element) {
    switch (this.format) {
      case "Atom": {
        const date = getTextContent(feed, "updated");
        return date ? parseDate(date) : undefined;
      }
      case "RSS": {
        const date = getTextContent(feed, "lastBuildDate");
        return date ? parseDate(date) : undefined;
      }
    }
  }

  private getLanguage(feed: Element) {
    return getTextContent(feed, "language");
  }

  private getLink(feed: Element) {
    return getTextContent(feed, "link");
  }

  /* -- Methods concerning item data -- */

  private mapItem(item: Element) {
    const result = {
      id: this.getItemId(item),
      title: this.getItemTitle(item),
      subtitle: this.getItemSubtitle(item),
      link: this.getItemLink(item),
      content: this.getItemContent(item) ?? "",
      enclosure: this.getItemEnclosure(item),
      thumbnail: this.getItemThumbnail(item),
    };

    // const urls = extractUrls(result.content);
    return result;
  }

  private getItemTitle(item: Element) {
    return getTextContent(item, "title");
  }

  private getItemSubtitle(item: Element) {
    switch (this.format) {
      case "Atom":
        return getTextContent(item, "summary");
      case "RSS":
        return getTextContent(item, "description");
    }
  }

  private getItemLink(item: Element) {
    switch (this.format) {
      case "Atom":
        return getAtomLink(item);
      case "RSS":
        return getTextContent(item, "link");
    }
  }

  private getItemContent(item: Element) {
    switch (this.format) {
      case "Atom":
        return getTextContent(item, "content");
      case "RSS":
        return item.getElementsByTagNameNS(
          FeedParser.RSS_NAMESPACES.CONTENT,
          "encoded"
        )[0]?.textContent;
    }
  }

  private getItemId(item: Element) {
    switch (this.format) {
      case "Atom":
        return getTextContent(item, "id");
      case "RSS":
        return getTextContent(item, "guid") || getTextContent(item, "link");
    }
  }

  private getItemEnclosure(item: Element) {
    const enclosure = item.querySelector("enclosure");
    if (enclosure) {
      const attributes = enclosure.attributes;
      const type = attributes.getNamedItem("type")?.value;
      const length = attributes.getNamedItem("length")?.value;
      const url = attributes.getNamedItem("url")?.value;
      return { type, length, url };
    }
  }

  private getItemThumbnail(item: Element) {
    const thumbnails = Array.from(item.querySelectorAll("thumbnail"))
      .map((thumbnail) => {
        const src = thumbnail.attributes.getNamedItem("url")?.value;
        const width = thumbnail.attributes.getNamedItem("width")?.value;
        return { src, width };
      })
      .sort((a, b) => a.width < b.width);
    return {
      srcSet: thumbnails.map(({ src, width }) => `${src} ${width}w`),
      src: thumbnails[0]?.src,
    };
  }
}
