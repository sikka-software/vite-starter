import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
// import * as dotenv from "dotenv";

// Load environment variables from .env file
// dotenv.config();

const app = new Hono();
app.use("/*", cors());

app.get("/ping", (c) => {
  return c.json({ message: "pong" });
});

const port = 1506;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
