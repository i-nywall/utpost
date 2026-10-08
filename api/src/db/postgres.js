import pkg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { config } from '../config.js';
import * as schema from './schema.js';

const { Pool } = pkg;

export const postgresPool = new Pool({ connectionString: config.postgresUrl });
export const postgresDB = drizzle(postgresPool, { schema });
