import { FeedParser } from "@parser";
import { fetch } from "@tauri-apps/plugin-http";

const urls = [
  "https://rss.art19.com/de-grote-podcastlas",
  "https://www.nrc.nl/rss/",
  "https://scientias.nl/feed",
  "https://www.youtube.com/feeds/videos.xml?channel_id=UC4eYXhJI4-7wSWc8UNRwD4A",
  "https://backend.deviantart.com/rss.xml?type=deviation&q=by%3Aloish+sort%3Atime+meta%3Aall",
];

const corsProxyURL = "https://cors-anywhere.herokuapp.com/";

const headers = {
  Accept:
    "application/rss+xml, application/rdf+xml;q=0.8, application/atom+xml;q=0.6, application/xml;q=0.4, text/xml;q=0.4",
};

async function processUrl(url: string) {
  let result;
  try {
    result = await fetch(url, {
      headers,
    });
  } catch (e) {
    result = await fetch(`${corsProxyURL}${url}`);
  }
  const content = await result.text();
  const parser = new FeedParser();
  return parser.parse(content);
}

export async function fetchFeed() {
  const result = await Promise.all(urls.map(processUrl));
  return result;
}
