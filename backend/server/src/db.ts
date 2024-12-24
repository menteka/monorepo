import { Hono } from "hono";
import { Bindings } from "./types";

const app = new Hono<{ Bindings: Bindings }>().get("/search", async (c) => {
  const { DB } = c.env;
  const { results } = await DB?.prepare(`SELECT * FROM FEEDS`)?.all();
  return c.json(results);
});

export type DB_API = typeof app;

export default app;
