const { query } = require('../config/database');
const { hashPassword, comparePassword, formatResponse } = require('../utils/helpers');
const { sendTokenResponse } = require('../utils/jwt');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json(
        formatResponse(false, 'User with this email already exists')
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const result = await query(
      `INSERT INTO users (name, email, password, created_at, updated_at) 
       VALUES ($1, $2, $3, NOW(), NOW()) 
       RETURNING id, name, email, created_at`,
      [name, email, hashedPassword]
    );

    const user = result.rows[0];

    // Send token response
    sendTokenResponse(user, 201, res, 'User registered successfully');
  } catch (error) {
    console.error('Register error:', error);
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const result = await query(
      'SELECT id, name, email, password, created_at FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json(
        formatResponse(false, 'Invalid credentials')
      );
    }

    const user = result.rows[0];

    // Check password
    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).json(
        formatResponse(false, 'Invalid credentials')
      );
    }

    // Send token response
    sendTokenResponse(user, 200, res, 'Login successful');
  } catch (error) {
    console.error('Login error:', error);
    next(error);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    const user = req.user;
    
    res.status(200).json(
      formatResponse(true, 'User profile retrieved', { user })
    );
  } catch (error) {
    console.error('Get me error:', error);
    next(error);
  }
};

// @desc    Logout user (client-side token removal)
// @route   POST /api/auth/logout
// @access  Private
const logout = async (req, res, next) => {
  try {
    res.status(200).json(
      formatResponse(true, 'Logout successful')
    );
  } catch (error) {
    console.error('Logout error:', error);
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe,
  logout
};