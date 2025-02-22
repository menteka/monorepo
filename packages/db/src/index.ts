export function initDb({ type = "local" }: { type?: Type }) {
  //if is discoverable, add to the public feeds
  //otherwise, write to private feeds
  const sharedInit = [
    ,
    `CREATE TABLE IF NOT EXISTS FEED_TAGS (feed_id INTEGER, tag_id INTEGER, PRIMARY KEY (feed_id, tag_id), FOREIGN KEY (feed_id) REFERENCES FEEDS(id), FOREIGN KEY (tag_id) REFERENCES TAGS(id))`,
    `CREATE TABLE IF NOT EXISTS PROFILES (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, description TEXT, iconUrl TEXT, logoUrl TEXT, socialLinks TEXT, officialUrl TEXT, type TEXT CHECK(type IN ('independent', 'commercial', 'nonprofit', 'educational', 'community')), location TEXT);`,
    `CREATE TABLE IF NOT EXISTS PROFILE_FEEDS (profile_id INTEGER, feed_id INTEGER, PRIMARY KEY (profile_id, feed_id), FOREIGN KEY (profile_id) REFERENCES PROFILES(id), FOREIGN KEY (feed_id) REFERENCES FEEDS(id));`,
  ];

  const localInit: string[] = [];
  const remoteInit: string[] = [];

  return sharedInit.concat(type === "local" ? localInit : remoteInit);
}

export function subscribeToFeed({
  type = "local",
  userId,
  url,
}:
  | ({ url: string } & { type?: "local"; userId?: never })
  | { type: "remote"; userId: string }) {
  if (type === "local") {
    return `INSERT INTO FEED_SUBSCRIPTIONS (profile_id, feed_id) VALUES (?, ?)`;
  }
  return `INSERT INTO PROFILE_FEEDS (profile_id, feed_id) VALUES (?, ?)`;
}
