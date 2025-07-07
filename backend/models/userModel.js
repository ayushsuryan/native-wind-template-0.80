const { query } = require('../config/database');

// SQL to create users table
const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    avatar_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

// SQL to create indexes
const createIndexes = `
  CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
  CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);
  CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
`;

// Initialize database tables
const initializeDatabase = async () => {
  try {
    await query(createUsersTable);
    await query(createIndexes);
    console.log('✅ Users table and indexes created successfully');
  } catch (error) {
    console.error('❌ Error creating users table:', error);
    throw error;
  }
};

// User model functions
const UserModel = {
  // Create a new user
  create: async (userData) => {
    const { name, email, password, role = 'user' } = userData;
    const result = await query(
      `INSERT INTO users (name, email, password, role, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, NOW(), NOW()) 
       RETURNING id, name, email, role, created_at`,
      [name, email, password, role]
    );
    return result.rows[0];
  },

  // Find user by email
  findByEmail: async (email) => {
    const result = await query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  },

  // Find user by ID
  findById: async (id) => {
    const result = await query(
      'SELECT id, name, email, role, avatar_url, is_active, email_verified, last_login, created_at, updated_at FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  },

  // Update user
  update: async (id, updateData) => {
    const fields = Object.keys(updateData);
    const values = Object.values(updateData);
    
    const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
    
    const result = await query(
      `UPDATE users SET ${setClause}, updated_at = NOW() WHERE id = $${fields.length + 1} RETURNING id, name, email, role, created_at, updated_at`,
      [...values, id]
    );
    return result.rows[0];
  },

  // Delete user
  delete: async (id) => {
    const result = await query(
      'DELETE FROM users WHERE id = $1 RETURNING id',
      [id]
    );
    return result.rows[0];
  },

  // Get all users with pagination
  findAll: async (offset = 0, limit = 10, searchTerm = '') => {
    const searchPattern = `%${searchTerm}%`;
    const result = await query(
      `SELECT id, name, email, role, avatar_url, is_active, email_verified, last_login, created_at, updated_at 
       FROM users 
       WHERE name ILIKE $1 OR email ILIKE $1
       ORDER BY created_at DESC
       LIMIT $2 OFFSET $3`,
      [searchPattern, limit, offset]
    );
    return result.rows;
  },

  // Count users
  count: async (searchTerm = '') => {
    const searchPattern = `%${searchTerm}%`;
    const result = await query(
      'SELECT COUNT(*) FROM users WHERE name ILIKE $1 OR email ILIKE $1',
      [searchPattern]
    );
    return parseInt(result.rows[0].count);
  },

  // Update last login
  updateLastLogin: async (id) => {
    await query(
      'UPDATE users SET last_login = NOW() WHERE id = $1',
      [id]
    );
  }
};

module.exports = {
  UserModel,
  initializeDatabase
};