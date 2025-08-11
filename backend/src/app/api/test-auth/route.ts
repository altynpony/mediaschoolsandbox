import { auth } from "@/auth";
import { headers } from "next/headers";

export async function GET() {
  try {
    // Test if Better Auth is working
    const session = await auth.api.getSession({ headers: await headers() });
    
    return Response.json({
      status: "Auth system working",
      hasSession: !!session,
      user: session?.user || null,
      authUrl: process.env.BETTER_AUTH_URL
    });
  } catch (error) {
    console.error("Auth test error:", error);
    return Response.json({
      status: "Auth system error",
      error: error instanceof Error ? error.message : "Unknown error",
      authUrl: process.env.BETTER_AUTH_URL
    }, { status: 500 });
  }
}