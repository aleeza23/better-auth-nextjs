import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.NEXT_PUBLIC_NEON_CONNECTION_STRING,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
});
