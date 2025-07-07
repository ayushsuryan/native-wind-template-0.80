# Backend API

A robust Express.js backend API with PostgreSQL database integration, featuring authentication, user management, and comprehensive error handling.

## Features

- 🚀 Express.js web framework
- 🗄️ PostgreSQL database with Supabase
- 🔐 JWT-based authentication
- 🛡️ Security middleware (Helmet, CORS)
- ✅ Input validation
- 📝 Request logging
- 🔄 Error handling
- 📊 API monitoring endpoints

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database (Supabase recommended)
- npm or yarn

## Installation

1. Clone the repository and navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL=your_supabase_postgres_url_here
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
```

## Database Setup

The application will automatically create the necessary tables when you start the server. Make sure your PostgreSQL database is accessible via the `DATABASE_URL`.

### User Table Schema

```sql
CREATE TABLE users (
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
```

## Running the Application

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will start on the port specified in your `.env` file (default: 5000).

## API Endpoints

### Health Check
- `GET /health` - Check server status

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users` - Get all users (paginated, searchable)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### General API
- `GET /api/info` - Get API information
- `GET /api/db-status` - Get database status
- `GET /api/stats/users` - Get user statistics

## Request/Response Examples

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

### Login User
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

### Get Users (Protected)
```bash
GET /api/users?page=1&limit=10&search=john
Authorization: Bearer jwt_token_here
```

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer your_jwt_token_here
```

## Error Handling

The API returns consistent error responses:
```json
{
  "success": false,
  "error": "Error message here",
  "details": [] // Validation errors (if any)
}
```

## Project Structure

```
backend/
├── config/
│   └── database.js          # Database configuration
├── controllers/
│   ├── authController.js    # Authentication logic
│   └── userController.js    # User management logic
├── middleware/
│   ├── auth.js             # JWT authentication middleware
│   ├── errorHandler.js     # Global error handler
│   └── notFound.js         # 404 handler
├── models/
│   └── userModel.js        # User model and database schema
├── routes/
│   ├── auth.js             # Authentication routes
│   ├── users.js            # User routes
│   └── api.js              # General API routes
├── utils/
│   ├── helpers.js          # Helper functions
│   ├── jwt.js              # JWT utilities
│   └── validators.js       # Input validation
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies and scripts
├── README.md               # Documentation
└── server.js               # Main application entry point
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment mode | development |
| `DATABASE_URL` | PostgreSQL connection string | - |
| `JWT_SECRET` | JWT signing secret | - |
| `JWT_EXPIRES_IN` | JWT expiration time | 7d |
| `CLIENT_URL` | Frontend URL for CORS | http://localhost:3000 |

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- CORS protection
- Security headers with Helmet
- Rate limiting ready (can be implemented)
- SQL injection protection with parameterized queries

## Development

### Adding New Routes

1. Create controller function in appropriate controller file
2. Add route in the corresponding route file
3. Add validation if needed in `utils/validators.js`

### Database Migrations

For database schema changes, update the `models/userModel.js` file and restart the application. For production, implement proper migration scripts.

## Testing

Run tests (when implemented):
```bash
npm test
```

## Deployment

1. Set environment variables in your hosting platform
2. Ensure PostgreSQL database is accessible
3. Run `npm start`

## Contributing

1. Follow the existing code structure
2. Add proper error handling
3. Include input validation
4. Write meaningful commit messages
5. Test your changes

## License

MIT License