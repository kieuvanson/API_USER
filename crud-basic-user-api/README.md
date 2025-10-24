# 🚀 API USER: User Management Application

This document guides you through the setup, development, and usage of the basic User Management API, built with Node.js, Express, and PostgreSQL.

## 🎯 Overview & Key Features

API USER is a RESTful backend service providing CRUD (Create, Read, Update, Delete) operations for user data.

### Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| Backend Core | Node.js, Express | Server Environment and Framework |
| Database | PostgreSQL | Robust Relational Database |
| Interface | CLI & Axios | Interactive Command-Line Interface for testing |
| Quality | ESLint, Prettier, Nodemon | Ensures clean, consistent formatting, and automatic server reload |

### Highlights

- **Full CRUD**: Comprehensive user data management
- **Smart Search**: Supports case-insensitive name searching
- **Simple Testing**: Integrated, user-friendly CLI interface

## 🛠️ Setup & Installation

### System Requirements

You'll need Node.js (>= 14), npm, and a running PostgreSQL instance.

### 1. Project Initialization

```bash
# Clone or create the project directory
git clone <repository-url>
cd crud-basic-user-api

# Install necessary dependencies
npm install
```

### 2. Database Configuration

Create a `.env` file in the root directory and enter your PostgreSQL connection details:

```env
# Ensure your PostgreSQL instance is running
DB_USER=your_postgres_user
DB_HOST=localhost
DB_NAME=your_database_name
DB_PASSWORD=your_password
DB_PORT=5432
```

### 3. Create Table Structure

Use the following SQL commands to set up the users table in PostgreSQL:

```sql
CREATE DATABASE your_database_name; -- Run only if the database doesn't exist

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  avatar TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## ⚙️ Running the Application

The API server runs on port 4000.

### Development Mode

```bash
npm run dev
# Server starts at http://localhost:4000. It reloads automatically on code changes.
```

### Production Mode

```bash
npm start
```

## 💻 CLI Experience (The Best Way to Test!)

Since you're not using Postman, the recommended way to interact with the API is through the built-in interactive CLI tool.

```bash
node src/cli.js
```

Running this command displays an interactive menu:

| Option | CRUD Operation | Functionality |
|--------|----------------|---------------|
| 1 | Read (GET) | View all users / Search by name (optional) |
| 2 | Read (GET) | Search for a single user by name |
| 3 | Create (POST) | Add a new user |
| 4 | Update (PUT) | Update user information by ID |
| 5 | Delete (DELETE) | Delete a user by ID |
| 0 | - | Exit the application |

## 🌐 API Endpoints (For Developers)

For manual testing (using curl or other tools), here is the endpoint reference:

**Base URL:** `http://localhost:4000/users`

| Method | Endpoint | Details |
|--------|----------|---------|
| GET | `/users` | Get all users (can use `?name=...` for filtering) |
| GET | `/users/search` | Get the first user matching the name (`?name=...` required) |
| GET | `/users/:id` | Get user by ID |
| POST | `/users` | Create new user (requires JSON body) |
| PUT | `/users/:id` | Update user by ID (requires JSON body) |
| DELETE | `/users/:id` | Delete user by ID |

### Request Body Example

**Create/Update User:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "0901234567",
  "avatar": "https://i.pravatar.cc/150?img=1"
}
```

## 🧹 Code Quality Management

This project uses **ESLint** and **Prettier** to maintain a clean and consistent codebase.

### ESLint

ESLint helps detect and fix code quality issues:

```bash
# Check for linting errors
npm run lint

# Automatically fix linting errors
npm run lint:fix
```

**What it does:**
- Finds syntax errors and code problems
- Enforces consistent coding style
- Catches potential bugs before runtime
- Helps maintain code quality across the project

### Prettier

Prettier automatically formats your code for consistency:

```bash
# Format all files
npm run format

# Check if files are formatted
npm run format:check
```

**What it does:**
- Automatically formats code (indentation, spacing, quotes, etc.)
- Enforces consistent code style across all files
- Makes code more readable
- Reduces merge conflicts from formatting differences

### Configuration Files

- `.eslintrc.js` - ESLint configuration rules
- `.prettierrc` - Prettier formatting preferences
- `.gitignore` - Excludes node_modules and build files from git

### Recommended Workflow

1. **Before committing:** Run `npm run lint:fix` to fix any linting issues
2. **Format code:** Run `npm run format` to ensure consistent formatting
3. **Commit:** Your code is now clean and consistent!

### VS Code Integration

If you're using VS Code, install these extensions for automatic formatting:

- **ESLint Extension** - Shows linting errors in real-time
- **Prettier Extension** - Auto-formats on save

Add to your VS Code settings (`.vscode/settings.json`):
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## 📂 Project Structure

```
crud-basic-user-api/
├── src/
│   ├── cli.js              # CLI Testing Interface
│   ├── config/
│   │   └── db.config.js    # DB Configuration
│   ├── controllers/
│   │   └── user_controller.js  # Business Logic (CRUD handlers)
│   ├── models/
│   │   └── User.js         # Database Interaction (SQL Queries)
│   └── routes/
│       └── user_routes.js  # API Path Definitions
├── server.js               # Application Entry Point
├── package.json
├── .env                    # Environment variables (not in repo)
└── README.md              # This file
```

## 💡 Future Enhancements

- Add Pagination for large datasets
- Implement Authentication (Login/Register)
- Add dedicated Validation Middleware for POST/PUT requests
- Unit and Integration Tests
- API Documentation with Swagger

## License

MIT
