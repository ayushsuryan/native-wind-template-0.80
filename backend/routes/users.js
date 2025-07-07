const express = require('express');
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const { body } = require('express-validator');
const { checkValidation } = require('../utils/validators');

const router = express.Router();

// Validation for user updates
const validateUserUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  checkValidation
];

// All routes are protected
router.use(protect);

// User routes
router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', validateUserUpdate, updateUser);
router.delete('/:id', deleteUser);

module.exports = router;