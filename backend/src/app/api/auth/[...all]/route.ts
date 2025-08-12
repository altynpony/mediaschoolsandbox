import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { toNextJsHandler } from "better-auth/next-js";
import { db } from "../../../../lib/db";
import { account, session, user, verification } from "../../../../db/schema";

const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:5001"),
  trustedOrigins: ["https://mediaschoolsandbox.vercel.app", "http://localhost:5001"],
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24 // 1 day
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
        input: false
      }
    }
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: user,
      account: account,
      verification: verification,
      session: session
    }
  }),
  plugins: [nextCookies()],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET as string,
    }
  }
});

export const { GET, POST } = toNextJsHandler(auth.handler);