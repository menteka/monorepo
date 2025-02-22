import type { Type } from "./types";

export const init = {
  feed_items,
  feeds,
  feed_subscriptions,
  profiles,
  users,
  feed_tags,
  view_subscriptions,
  list_subscriptions,
};

function feed_tags({ type }: { type?: Type }) {
  if (type === "remote_public") return "";
  return `
    CREATE TABLE IF NOT EXISTS FEED_TAGS (
      feed_url TEXT,
      tag_id TEXT,
      PRIMARY KEY (feed_url, tag_id)
      )`;
}

function users({ type }: { type: Type }) {
  if (type !== "remote_private") return "";
  return `
    CREATE TABLE IF NOT EXISTS USERS (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      display_name TEXT NOT NULL,
      email TEXT UNIQUE,
      password TEXT NOT NULL,
    )`;
}

function profiles({ type }: { type?: Type }) {
  if (type !== "remote_public") return "";
  return `
    CREATE TABLE IF NOT EXISTS PROFILES (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      imgUrl TEXT,
      socialLinks TEXT,
      officialUrl TEXT,
      type TEXT, 
      location TEXT
      )`;
}

function feed_items({ type }: { type?: Type }) {
  if (type !== "local") return "";
  return `
    CREATE TABLE IF NOT EXISTS FEED_ITEMS (
      feed_url TEXT,
      id TEXT NOT NULL,
      title TEXT,
      subtitle TEXT,
      link TEXT,
      content TEXT,
      enclosure TEXT,
      thumbnail TEXT,
      PRIMARY KEY (feed_url, id)
      )`;
}

function feed_subscriptions({ type }: { type?: Type }) {
  if (type === "remote_public") return "";
  const isLocal = type === "local";
  return `
    CREATE TABLE IF NOT EXISTS FEED_SUBSCRIPTIONS (
      feed_url TEXT NOT NULL,
      is_private INTEGER DEFAULT 0,
      list_id INTEGER,
      folder TEXT,
      ${
        isLocal
          ? `last_fetched TEXT,
             last_error TEXT,
             PRIMARY KEY (feed_url)`
          : `${foreign_user_id}
             PRIMARY KEY (feed_url, user_id)`
      }
      )`;
}

//FIXME
function view_subscriptions({ type }: { type?: Type }) {
  if (type === "remote_public") return "";
  return `
    CREATE TABLE IF NOT EXISTS VIEW_SUBSCRIPTIONS (
      view_id INTEGER,
      feed_url TEXT,
      PRIMARY KEY (view_id, feed_url),
      )`;
}

//FIXME
function list_subscriptions({ type }: { type?: Type }) {
  if (type === "remote_public") return "";
  return `
    CREATE TABLE IF NOT EXISTS LIST_SUBSCRIPTIONS (
      list_id INTEGER,
      feed_url TEXT,
      PRIMARY KEY (list_id, feed_url)
      )`;
}

function lists({ type }: { type?: Type }) {
  if (type === "remote_private") return "";
  return `
    CREATE TABLE IF NOT EXISTS LISTS (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      user_id INTEGER,
      )`;
}

function list_feeds({ type }: { type?: Type }) {
  if (type === "remote_private") return "";
  return `
    CREATE TABLE IF NOT EXISTS LIST_FEEDS (
      list_id INTEGER FOREIGN,
      feed_url TEXT,
      PRIMARY KEY (list_id, feed_url)
      )`;
}

function profile_feeds({ type }: { type?: Type }) {
  if (type === "remote_private") return "";
  return `
    CREATE TABLE IF NOT EXISTS PROFILE_FEEDS (
      profile_id INTEGER FOREIGN,
      feed_url TEXT,
      PRIMARY KEY (profile_id, feed_url)
      )`;
}

function views({ type }: { type?: Type }) {
  return `
  CREATE TABLE IF NOT EXISTS VIEWS (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      list_id INTEGER,
      user_id INTEGER,
      title TEXT NOT NULL,
      content TEXT NOT NULL
    )`;
}
