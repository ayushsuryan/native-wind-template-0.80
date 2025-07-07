const { Pool } = require('pg');

// Create a connection pool optimized for Supavisor session mode
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for Supabase connections
  },
  max: 20, // Maximum number of clients in the pool
  min: 2, // Minimum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle
  connectionTimeoutMillis: 10000, // Increased timeout for better reliability
  acquireTimeoutMillis: 60000, // How long to wait for a connection from the pool
  createTimeoutMillis: 30000, // How long to wait when creating a new client
  destroyTimeoutMillis: 5000, // How long to wait when destroying a client
  reapIntervalMillis: 1000, // How often to check for idle clients
  createRetryIntervalMillis: 200, // How long to wait before retrying to create a client
});

// Test database connection
const connectDB = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    console.log('Database connected at:', result.rows[0].now);
    return true;
  } catch (error) {
    console.error('Database connection error:', error.message);
    throw error;
  }
};

// Query helper function
const query = async (text, params) => {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: result.rowCount });
    return result;
  } catch (error) {
    console.error('Query error:', error.message);
    throw error;
  }
};

// Get a client from the pool
const getClient = async () => {
  return await pool.connect();
};

// Close pool
const closePool = async () => {
  await pool.end();
};

module.exports = {
  pool,
  query,
  getClient,
  connectDB,
  closePool
};