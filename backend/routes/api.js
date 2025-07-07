const express = require('express');
const { query } = require('../config/database');
const { formatResponse } = require('../utils/helpers');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @desc    Get API info
// @route   GET /api/info
// @access  Public
router.get('/info', (req, res) => {
  res.status(200).json(
    formatResponse(true, 'API information', {
      name: 'Backend API',
      version: '1.0.0',
      description: 'Express.js backend API with PostgreSQL',
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    })
  );
});

// @desc    Get database status
// @route   GET /api/db-status
// @access  Private
router.get('/db-status', protect, async (req, res, next) => {
  try {
    const result = await query('SELECT NOW() as current_time, version() as db_version');
    
    res.status(200).json(
      formatResponse(true, 'Database status', {
        status: 'connected',
        current_time: result.rows[0].current_time,
        db_version: result.rows[0].db_version
      })
    );
  } catch (error) {
    console.error('Database status error:', error);
    next(error);
  }
});

// @desc    Get user statistics
// @route   GET /api/stats/users
// @access  Private
router.get('/stats/users', protect, async (req, res, next) => {
  try {
    const totalUsersResult = await query('SELECT COUNT(*) as count FROM users');
    const recentUsersResult = await query(
      'SELECT COUNT(*) as count FROM users WHERE created_at > NOW() - INTERVAL \'7 days\''
    );

    res.status(200).json(
      formatResponse(true, 'User statistics', {
        total_users: parseInt(totalUsersResult.rows[0].count),
        recent_users: parseInt(recentUsersResult.rows[0].count)
      })
    );
  } catch (error) {
    console.error('User stats error:', error);
    next(error);
  }
});

module.exports = router;