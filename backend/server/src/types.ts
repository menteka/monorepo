export type { DB_API } from "./db";

export type Bindings = {
  DB: D1Database;
  JWT_SECRET: string;
  EMAIL_API_KEY: string; // For your email service (SendGrid, Resend, etc.)
};
