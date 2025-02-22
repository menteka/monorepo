import { foreign_user_id } from "./snippets";
import { Type } from "./types";

function init_feeds({ type }: { type?: Type }) {
  const isPrivate = type === "remote_private";
  const isLocal = type === "local";
  const isPublic = type === "remote_public";
  return `
    CREATE TABLE IF NOT EXISTS FEEDS (
      url TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      link TEXT,
      copyright TEXT,
      is_nsfw INTEGER DEFAULT 0,
      is_ai INTEGER DEFAULT 0,
      platform TEXT,
      platform_params TEXT,
      type TEXT,
      language TEXT,
    ${isLocal ? `last_feched TEXT,` : ""}
    ${isPublic ? `score REAL DEFAULT 0,` : ""}
    ${
      isPrivate
        ? `${foreign_user_id},
            PRIMARY KEY (url, user_id)`
        : `PRIMARY KEY (url)`
    }
  )`;
}

function create_feed({ type }: { type?: Type }) {
  return `
    INSERT INTO FEEDS (
      url TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      link TEXT,
      copyright TEXT,
      is_nsfw INTEGER DEFAULT 0,
      is_ai INTEGER DEFAULT 0,
      platform TEXT,
      platform_params TEXT,
      type TEXT,
      language TEXT,
        ${type === "local" ? `last_fetched TEXT,` : ""}
        ${type === "remote_public" ? `score REAL DEFAULT 0,` : ""}
        ${type === "remote_private" ? `${foreign_user_id},` : ""}
    ) VALUES (
        ?,?,?,?,?,?,?,?,?,?,?,?,
        ${type === "local" ? "?, " : ""}
        ${type === "remote_public" ? "?, " : ""}
        ${type === "remote_private" ? "?, " : ""}
        )`;
}
