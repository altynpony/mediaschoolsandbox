import { auth } from "@/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

const { GET: AuthGET, POST: AuthPOST } = toNextJsHandler(auth.handler);

// Add CORS headers
function addCORSHeaders(response: NextResponse) {
  const origin = process.env.NODE_ENV === 'production' 
    ? "https://mediaschoolsandbox.vercel.app" 
    : "*";
  
  response.headers.set("Access-Control-Allow-Origin", origin);
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  response.headers.set("Access-Control-Allow-Credentials", "true");
  return response;
}

export async function GET(request: NextRequest) {
  const response = await AuthGET(request);
  return addCORSHeaders(response);
}

export async function POST(request: NextRequest) {
  const response = await AuthPOST(request);
  return addCORSHeaders(response);
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 200 });
  return addCORSHeaders(response);
}