# Product Management API

## Description

This is a Node.js REST API for managing products. It provides CRUD operations (Create, Read, Update, Delete) for products stored in a PostgreSQL database. The API also includes history tracking for product updates using event emitters.

## Features

- Get all products
- Add a new product
- Update an existing product (with history tracking)
- Delete a product
- Automatic history logging for product updates
- Code duplication check during updates
- CORS enabled
- Input validation

## Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd product
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:
<<<<<<< HEAD
   Create a `.env` file in the root directory with the following variables (make sure `.env` is added to `.gitignore` to avoid committing sensitive data):
=======
   Create a `.env` file in the root directory with the following variables:
>>>>>>> 1df2dbe26a889fb61fe013862a1ac9c68847c6fe

   ```
   PORT=3000
   DB_USER=your_db_user
   DB_HOST=your_db_host
   DB_NAME=your_db_name
   DB_PASSWORD=your_db_password
   DB_PORT=5432
   ```

4. Set up the database:
   - Ensure PostgreSQL is installed and running.
   - Create a database named as specified in `DB_NAME`.
   - Create the necessary tables:

     ```sql
     CREATE TABLE products (
       id SERIAL PRIMARY KEY,
       code VARCHAR(255) UNIQUE,
       name VARCHAR(255),
       price DECIMAL,
       amount INTEGER,
       attributes JSONB
     );

     CREATE TABLE product_history (
       id SERIAL PRIMARY KEY,
       product_id INTEGER REFERENCES products(id),
       old_data JSONB,
       new_data JSONB,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );
     ```

## Usage

### Development

Run the server in development mode with auto-restart:

```
npm run dev
```

### Production

Run the server in production mode:

```
npm start
```

The server will start on the port specified in the `.env` file (default: 3000).

## API Endpoints

All endpoints are prefixed with `/product`.

### GET /product/

- Description: Retrieve all products
- Response: JSON array of products

### POST /product/

- Description: Add a new product
- Body: JSON object with `code`, `name`, `price`, `amount`, `attributes`
- Response: JSON object of the created product

### PUT /product/:id

- Description: Update a product by ID
- Body: JSON object with `code`, `name`, `price`, `amount`, `attributes`
- Response: JSON object of the updated product
- Note: Checks for code duplication and saves update history

### DELETE /product/:id

- Description: Delete a product by ID
- Response: Success message

## Scripts

- `npm start`: Start the server
- `npm run dev`: Start the server with nodemon for development
- `npm run lint`: Run ESLint
- `npm run lint:fix`: Run ESLint with auto-fix
- `npm run format`: Format code with Prettier

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- pg (PostgreSQL client)
- Sequelize
- CORS
- dotenv
<<<<<<< HEAD
=======

>>>>>>> 1df2dbe26a889fb61fe013862a1ac9c68847c6fe
