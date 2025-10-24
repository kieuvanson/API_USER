# Basic User CRUD API

RESTful API for user management with Node.js, Express, and PostgreSQL. Includes CLI interface.

## Installation

```bash
npm install
```

Create `.env`:
```env
DB_USER=your_postgres_user
DB_HOST=localhost
DB_NAME=your_database_name
DB_PASSWORD=your_password
DB_PORT=5432
```

## Run

```bash
npm start          # or npm run dev
node src/cli.js    # CLI application
```

Server: `http://localhost:4000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Get all users (`?name=` for search) |
| GET | `/users/search?name=` | Search user by name |
| GET | `/users/:id` | Get user by ID |
| POST | `/users` | Create new user |
| PUT | `/users/:id` | Update user |
| DELETE | `/users/:id` | Delete user |

## Project Structure

```
src/
├── cli.js              # CLI application
├── config/db.config.js # Database config
├── controllers/        # Request handlers
├── models/            # Database queries
└── routes/            # API routes
```
