const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

// Verify JWT token
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

// Send token response
const sendTokenResponse = (user, statusCode, res, message = 'Success') => {
  // Create token
  const token = generateToken({ id: user.id });

  // Remove password from user object
  const { password, ...userWithoutPassword } = user;

  res.status(statusCode).json({
    success: true,
    message,
    token,
    user: userWithoutPassword
  });
};

module.exports = {
  generateToken,
  verifyToken,
  sendTokenResponse
};