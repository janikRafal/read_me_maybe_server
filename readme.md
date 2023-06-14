# Project Name

This project is a Node.js REST API application using Express.js framework, MySQL database, and Sequelize ORM. It serves as a system to manage books, categories, and user authentication.

## Getting Started

These instructions will guide you on how to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- MySQL Server

### Installing

1. Clone the repository:

    ```
    git clone <repo-url>
    ```

2. Change into the project directory:

    ```
    cd <project-name>
    ```

3. Install the dependencies:
  
    ```
    npm install
    ```

4. Start the server:
  
    ```
    npm start
    ```

## API Endpoints

### Auth Routes

- POST /auth/register: Register a new user. Needs username, email, and password in request body.
- POST /auth/login: Login a user. Needs username and password in request body.

### Book Routes

- GET /books: Get all books. Requires JWT token in Authorization header.
- POST /books/create: Create a new book. Requires JWT token in Authorization header and book data in request body.
- GET /books/:id Get a single book by its ID. Requires JWT token in Authorization header.
- PATCH /books/:id/update: Update a book by its ID. Requires JWT token in Authorization header and updated data in request body.
- DELETE /books/:id/delete: Delete a book by its ID. Requires JWT token in Authorization header.
- GET /books/:id/details: Get a single book with its category name by its ID. Requires JWT token in Authorization header.

### Category Routes

- GET /categories: Get all categories. Requires JWT token in Authorization header.
- POST /categories/create: Create a new category. Requires JWT token in Authorization header and category data in request body.
- GET /categories/with-books: Get all categories with their associated books. Requires JWT token in Authorization header.
- GET /categories/:id Get a single category by its ID. Requires JWT token in Authorization header.
- PATCH /categories/:id/update: Update a category by its ID. Requires JWT token in Authorization header and updated data in request body.
- DELETE /categories/:id/delete: Delete a category by its ID. Requires JWT token in Authorization header.

## Built With

- Express.js
- MySQL
- Sequelize
