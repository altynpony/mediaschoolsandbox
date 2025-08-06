import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './db/schema'
import * as relations from './db/relations'
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.database_url as string)
export const db = drizzle({ client: sql, schema: { ...schema, ...relations } });