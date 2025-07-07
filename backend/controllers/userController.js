const { query } = require('../config/database');
const { formatResponse, paginate, calculatePagination } = require('../utils/helpers');

// @desc    Get all users
// @route   GET /api/users
// @access  Private
const getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const { limit: limitNum, offset } = paginate(page, limit);

    let queryText = `
      SELECT id, name, email, created_at, updated_at 
      FROM users 
      WHERE name ILIKE $1 OR email ILIKE $1
      ORDER BY created_at DESC
      LIMIT $2 OFFSET $3
    `;

    const searchPattern = `%${search}%`;
    const result = await query(queryText, [searchPattern, limitNum, offset]);

    // Get total count
    const countResult = await query(
      'SELECT COUNT(*) FROM users WHERE name ILIKE $1 OR email ILIKE $1',
      [searchPattern]
    );

    const totalCount = parseInt(countResult.rows[0].count);
    const pagination = calculatePagination(totalCount, page, limit);

    res.status(200).json(
      formatResponse(true, 'Users retrieved successfully', {
        users: result.rows,
        pagination
      })
    );
  } catch (error) {
    console.error('Get users error:', error);
    next(error);
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private
const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      'SELECT id, name, email, created_at, updated_at FROM users WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json(
        formatResponse(false, 'User not found')
      );
    }

    res.status(200).json(
      formatResponse(true, 'User retrieved successfully', {
        user: result.rows[0]
      })
    );
  } catch (error) {
    console.error('Get user error:', error);
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/:id
// @access  Private
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    // Check if user exists
    const existingUser = await query(
      'SELECT id FROM users WHERE id = $1',
      [id]
    );

    if (existingUser.rows.length === 0) {
      return res.status(404).json(
        formatResponse(false, 'User not found')
      );
    }

    // Check if email is already taken by another user
    if (email) {
      const emailCheck = await query(
        'SELECT id FROM users WHERE email = $1 AND id != $2',
        [email, id]
      );

      if (emailCheck.rows.length > 0) {
        return res.status(400).json(
          formatResponse(false, 'Email is already taken')
        );
      }
    }

    // Build update query dynamically
    const updates = [];
    const values = [];
    let valueIndex = 1;

    if (name) {
      updates.push(`name = $${valueIndex++}`);
      values.push(name);
    }

    if (email) {
      updates.push(`email = $${valueIndex++}`);
      values.push(email);
    }

    updates.push(`updated_at = NOW()`);
    values.push(id);

    const updateQuery = `
      UPDATE users 
      SET ${updates.join(', ')}
      WHERE id = $${valueIndex}
      RETURNING id, name, email, created_at, updated_at
    `;

    const result = await query(updateQuery, values);

    res.status(200).json(
      formatResponse(true, 'User updated successfully', {
        user: result.rows[0]
      })
    );
  } catch (error) {
    console.error('Update user error:', error);
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      'DELETE FROM users WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json(
        formatResponse(false, 'User not found')
      );
    }

    res.status(200).json(
      formatResponse(true, 'User deleted successfully')
    );
  } catch (error) {
    console.error('Delete user error:', error);
    next(error);
  }
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser
};