import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({
      status: "success",
      environment: process.env.NODE_ENV,
      betterAuthUrl: process.env.BETTER_AUTH_URL,
      betterAuthSecret: process.env.BETTER_AUTH_SECRET ? "present" : "missing",
      databaseUrl: process.env.DATABASE_URL ? "present" : "missing",
      googleClientId: process.env.GOOGLE_AUTH_CLIENT_ID ? "present" : "missing",
      googleClientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET ? "present" : "missing",
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}