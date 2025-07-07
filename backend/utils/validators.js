const { body, validationResult } = require('express-validator');

// Email validation
const validateEmail = body('email')
  .isEmail()
  .normalizeEmail()
  .withMessage('Please provide a valid email');

// Password validation
const validatePassword = body('password')
  .isLength({ min: 6 })
  .withMessage('Password must be at least 6 characters long')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
  .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number');

// Name validation
const validateName = body('name')
  .trim()
  .isLength({ min: 2, max: 50 })
  .withMessage('Name must be between 2 and 50 characters');

// Check validation results
const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

// Registration validation rules
const validateRegistration = [
  validateName,
  validateEmail,
  validatePassword,
  checkValidation
];

// Login validation rules
const validateLogin = [
  validateEmail,
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  checkValidation
];

module.exports = {
  validateEmail,
  validatePassword,
  validateName,
  checkValidation,
  validateRegistration,
  validateLogin
};