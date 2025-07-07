const bcrypt = require('bcryptjs');

// Hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt);
};

// Compare password
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Generate random string
const generateRandomString = (length = 32) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Format response
const formatResponse = (success, message, data = null, error = null) => {
  return {
    success,
    message,
    ...(data && { data }),
    ...(error && { error }),
    timestamp: new Date().toISOString()
  };
};

// Paginate results
const paginate = (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  return {
    limit: parseInt(limit),
    offset: parseInt(offset)
  };
};

// Calculate pagination info
const calculatePagination = (totalCount, page, limit) => {
  const totalPages = Math.ceil(totalCount / limit);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  return {
    currentPage: parseInt(page),
    totalPages,
    totalCount: parseInt(totalCount),
    hasNextPage,
    hasPreviousPage,
    limit: parseInt(limit)
  };
};

module.exports = {
  hashPassword,
  comparePassword,
  generateRandomString,
  formatResponse,
  paginate,
  calculatePagination
};