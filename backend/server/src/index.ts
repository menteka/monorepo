import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { cors } from "hono/cors";

// Define types
type Bindings = {
  DB: D1Database;
  JWT_SECRET: string;
  EMAIL_API_KEY: string; // For your email service (SendGrid, Resend, etc.)
};

type User = {
  id: string;
  email: string;
  createdAt: string;
};

type MagicLink = {
  id: string;
  userId: string;
  token: string;
  expiresAt: string;
  used: number;
};

type UserData = {
  userId: string;
  data: string;
  createdAt: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// Middleware setup
app.use("/*", cors());
app.use("/api/*", async (c, next) => {
  try {
    await next();
  } catch (e) {
    if (e instanceof HTTPException) {
      return e.getResponse();
    }
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

// Auth middleware
const auth = jwt({
  secret: (c) => c.env.JWT_SECRET,
});

// Schema validation
const emailSchema = z.object({
  email: z.string().email(),
});

const magicLinkSchema = z.object({
  token: z.string(),
});

const userDataSchema = z.object({
  data: z.string(),
});

app.get("/", (c) => c.text("Pretty Blog API"));

// Initialize database tables
app.get("/init", async (c) => {
  const { DB } = c.env;
  await DB.batch([
    DB.prepare(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE,
        createdAt TEXT
      )
    `),
    DB.prepare(`
      CREATE TABLE IF NOT EXISTS magic_links (
        id TEXT PRIMARY KEY,
        userId TEXT,
        token TEXT UNIQUE,
        expiresAt TEXT,
        used INTEGER DEFAULT 0,
        FOREIGN KEY(userId) REFERENCES users(id)
      )
    `),
    DB.prepare(`
      CREATE TABLE IF NOT EXISTS user_data (
        id TEXT PRIMARY KEY,
        userId TEXT,
        data TEXT,
        createdAt TEXT,
        FOREIGN KEY(userId) REFERENCES users(id)
      )
    `),
  ]);
  return c.json({ message: "Database initialized" });
});

// Helper function to send magic link email
async function sendMagicLinkEmail(email: string, token: string, c: any) {
  const magicLink = `${c.req.url.origin}/auth/verify?token=${token}`;

  // Example using a generic email service
  // Replace this with your preferred email service implementation
  const emailData = {
    to: email,
    subject: "Your Login Link",
    text: `Click here to log in: ${magicLink}\nThis link expires in 15 minutes.`,
    html: `<p>Click <a href="${magicLink}">here</a> to log in.</p><p>This link expires in 15 minutes.</p>`,
  };

  // Implement your email sending logic here
  // Example: await sendEmail(emailData, c.env.EMAIL_API_KEY)

  console.log("Magic link email sent:", emailData);
}

// Auth routes
app.post("/auth/login", zValidator("json", emailSchema), async (c) => {
  const { DB } = c.env;
  const { email } = await c.req.json();

  // Get or create user
  let user = await DB.prepare("SELECT * FROM users WHERE email = ?")
    .bind(email)
    .first<User>();

  if (!user) {
    const userId = crypto.randomUUID();
    await DB.prepare(
      `
      INSERT INTO users (id, email, createdAt)
      VALUES (?, ?, ?)
    `
    )
      .bind(userId, email, new Date().toISOString())
      .run();

    user = { id: userId, email, createdAt: new Date().toISOString() };
  }

  // Create magic link
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString(); // 15 minutes

  await DB.prepare(
    `
    INSERT INTO magic_links (id, userId, token, expiresAt, used)
    VALUES (?, ?, ?, ?, 0)
  `
  )
    .bind(crypto.randomUUID(), user.id, token, expiresAt)
    .run();

  // Send magic link email
  await sendMagicLinkEmail(email, token, c);

  return c.json({ message: "Magic link sent to your email" });
});

app.post("/auth/verify", zValidator("json", magicLinkSchema), async (c) => {
  const { DB } = c.env;
  const { token } = await c.req.json();

  const magicLink = await DB.prepare(
    `
    SELECT ml.*, u.email 
    FROM magic_links ml
    JOIN users u ON ml.userId = u.id
    WHERE ml.token = ? AND ml.used = 0 AND ml.expiresAt > ?
  `
  )
    .bind(token, new Date().toISOString())
    .first<MagicLink & { email: string }>();

  if (!magicLink) {
    throw new HTTPException(401, { message: "Invalid or expired token" });
  }

  // Mark magic link as used
  await DB.prepare("UPDATE magic_links SET used = 1 WHERE token = ?")
    .bind(token)
    .run();

  // Generate JWT
  const authToken = await jwt.sign(
    { userId: magicLink.userId, email: magicLink.email },
    c.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return c.json({ token: authToken });
});

// Protected routes
app.post("/api/data", auth, zValidator("json", userDataSchema), async (c) => {
  const { DB } = c.env;
  const { userId } = c.get("jwtPayload");
  const { data } = await c.req.json();

  const id = crypto.randomUUID();
  await DB.prepare(
    `
    INSERT INTO user_data (id, userId, data, createdAt)
    VALUES (?, ?, ?, ?)
  `
  )
    .bind(id, userId, data, new Date().toISOString())
    .run();

  return c.json({ id });
});

app.get("/api/data", auth, async (c) => {
  const { DB } = c.env;
  const { userId } = c.get("jwtPayload");

  const data = await DB.prepare(
    `
    SELECT * FROM user_data WHERE userId = ?
  `
  )
    .bind(userId)
    .all<UserData>();

  return c.json(data.results);
});

app.get("/api/data/:id", auth, async (c) => {
  const { DB } = c.env;
  const { userId } = c.get("jwtPayload");
  const id = c.req.param("id");

  const data = await DB.prepare(
    `
    SELECT * FROM user_data WHERE id = ? AND userId = ?
  `
  )
    .bind(id, userId)
    .first<UserData>();

  if (!data) {
    throw new HTTPException(404, { message: "Data not found" });
  }

  return c.json(data);
});

export default app;
