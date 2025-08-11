import { nextCookies } from "better-auth/next-js";
import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react

export const authClient = createAuthClient({
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24 // 1 day (every 1 day the session expiration is updated)
  },
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  plugins: [nextCookies()]
});
