import { auth } from "@/auth";
import { toNextJsHandler } from "better-auth/next-js";

try {
  const handlers = toNextJsHandler(auth.handler);
  export const { GET, POST } = handlers;
} catch (error) {
  console.error("Auth handler initialization failed:", error);
  
  // Fallback handlers
  export const GET = async () => {
    return new Response(JSON.stringify({ error: "Auth initialization failed", details: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  };
  
  export const POST = async () => {
    return new Response(JSON.stringify({ error: "Auth initialization failed", details: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  };
}