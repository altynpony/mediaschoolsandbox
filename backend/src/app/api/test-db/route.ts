import { NextResponse } from 'next/server';
import { db } from '@/index';
import { user } from '@/db/schema';

export async function GET() {
  try {
    // Test database connection
    const result = await db.select().from(user).limit(1);
    
    return NextResponse.json({
      status: "success",
      message: "Database connected",
      userCount: result.length,
      environment: process.env.NODE_ENV,
      databaseUrl: process.env.DATABASE_URL ? "present" : "missing"
    });
  } catch (error) {
    return NextResponse.json({
      status: "error", 
      message: "Database connection failed",
      error: error instanceof Error ? error.message : "Unknown error",
      environment: process.env.NODE_ENV
    }, { status: 500 });
  }
}