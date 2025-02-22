import { type } from "arktype";

export const supportedFeedTypes = [
  "blog",
  "podcast",
  "video",
  "music",
  "image",
  "news_publication",
  "newsletter",
  "job_board",
  "academic_journal",
  "press_release",
] as const;

export const feed_type = type(
  `"${supportedFeedTypes.map((type) => `'${type}'`).join(" | ")}"`
);

export type FeedType = typeof feed_type.infer;

const feed_base = type({
  url: "string",
  title: "string",
  "description?": "string",
  "is_nsfw?": "0 | 1",
  "is_ai?": "0 | 1",
  "platform_type?": "string",
  "platform_params?": "string",
  "type?": feed_type,
});

export const privateFeed = type({
  "...": feed_base,
  user_id: "string",
});
export type PrivateFeed = typeof privateFeed.infer;

export const publicFeed = type({
  "...": feed_base,
  score: "number",
});
export type PublicFeed = typeof publicFeed.infer;

export const localFeed = type({
  "...": feed_base,
  last_fetched: "string",
});
export type LocalFeed = typeof localFeed.infer;
