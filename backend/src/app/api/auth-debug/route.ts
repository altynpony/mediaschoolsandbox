import { NextResponse } from 'next/server';

export async function GET() {
  const diagnostics = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    betterAuthUrl: process.env.BETTER_AUTH_URL,
    nextPublicApiUrl: process.env.NEXT_PUBLIC_API_URL,
    databaseUrl: process.env.DATABASE_URL ? 'SET' : 'MISSING',
    googleClientId: process.env.GOOGLE_AUTH_CLIENT_ID ? 'SET' : 'MISSING',
    googleClientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET ? 'SET' : 'MISSING',
    betterAuthSecret: process.env.BETTER_AUTH_SECRET ? 'SET' : 'MISSING'
  };

  try {
    // Try to import auth to see if it fails
    const { auth } = await import('@/auth');
    diagnostics['authObject'] = !!auth ? 'CREATED' : 'FAILED';
    diagnostics['authHandler'] = !!auth?.handler ? 'EXISTS' : 'MISSING';
  } catch (error) {
    diagnostics['authImportError'] = error.message;
  }

  return NextResponse.json(diagnostics);
}