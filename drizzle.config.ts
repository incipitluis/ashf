import * as dotenv from "dotenv"
import { defineConfig } from "drizzle-kit"

dotenv.config({
  path: ".env",
})

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
})
