import { FeedParser } from "@menteka/parser";
import { fetch } from "@tauri-apps/plugin-http";

const urls = [
  "https://rss.art19.com/de-grote-podcastlas",
  // "https://www.nrc.nl/rss/",
  // "https://scientias.nl/feed",
  // "https://www.youtube.com/feeds/videos.xml?channel_id=UC4eYXhJI4-7wSWc8UNRwD4A",
  // "https://backend.deviantart.com/rss.xml?type=deviation&q=by%3Aloish+sort%3Atime+meta%3Aall",
];

const headers = {
  Accept:
    "application/rss+xml, application/rdf+xml;q=0.8, application/atom+xml;q=0.6, application/xml;q=0.4, text/xml;q=0.4",
};

const parser = new FeedParser();

async function processFromUrl(url: string) {
  let result;
  try {
    result = await fetch(url, {
      headers,
    });
  } catch (e) {
    result = await fetch(url);
  }
  const content = await result.text();
  return parser.parse(content);
}

export async function fetchFeed() {
  const result = await Promise.all(urls.map(processFromUrl));
  return result;
}
