import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './db/schema'
import * as relations from './db/relations'
import postgres from 'postgres';

// PostgreSQL connection for both local and production
const connectionString = process.env.DATABASE_URL || 'postgresql://yury@localhost:5432/mediaschoolsandbox';

const sql = postgres(connectionString);
export const db = drizzle(sql, { schema: { ...schema, ...relations } });