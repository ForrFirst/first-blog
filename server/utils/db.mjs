// Create PostgreSQL Connection Pool for Supabase !
import * as pg from "pg";

const { Pool } = pg.default;

const connectionPool = new Pool({
  // ใช้ Supabase Database URL
  connectionString: process.env.SUPABASE_DB_URL,
  // Supabase ต้องใช้ SSL
  ssl: { rejectUnauthorized: false },
  // ปรับ pool settings
  max: 10,
  idleTimeoutMillis: 10000,
});

export default connectionPool;
