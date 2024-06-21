# Advanced Integration Testing Demo

This project is designed to help you learn and practice integration testing in a Node.js environment using Express and MongoDB. It includes various features and testing scenarios such as setting up a test database, validating inputs, testing routes with parameters, and handling authorization.

## Project Setup

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14 or higher recommended)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory.
3. Install the dependencies:

   ```bash
   npm install
   ```

### Configuration

1. Create a `config` directory in the root of your project.
2. Inside the `config` directory, create two configuration files: `default.json` and `test.json`.

#### `config/default.json`

```json
{
  "jwtPrivateKey": "yourPrivateKey",
  "db": "mongodb://localhost/advanced-integration-testing"
}
```

#### `config/test.json`

```json
{
  "jwtPrivateKey": "1234",
  "db": "mongodb://localhost/advanced-integration-testing-test"
}
```

### Running the Application

To start the application in development mode, use:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Running the Tests

To run the integration tests, use:

```bash
npm test
```

## Project Structure

```plaintext
advanced-integration-testing/
│
├── index.js
├── package.json
├── routes/
│   ├── genres.js
│   └── users.js
├── models/
│   ├── genre.js
│   └── user.js
├── middleware/
│   ├── auth.js
│   └── admin.js
├── startup/
│   ├── logging.js
│   ├── routes.js
│   ├── db.js
│   ├── config.js
│   └── validation.js
└── tests/
    ├── genres.test.js
    └── users.test.js
```

## Routes

### Genres

- `GET /api/genres`: Retrieves all genres.
- `POST /api/genres`: Creates a new genre. Requires authentication.
- `PUT /api/genres/:id`: Updates an existing genre.
- `DELETE /api/genres/:id`: Deletes a genre. Requires admin privileges.
- `GET /api/genres/:id`: Retrieves a genre by ID.

### Users

- `POST /api/users`: Registers a new user.

## Middleware

- `auth.js`: Middleware to check if the user is authenticated.
- `admin.js`: Middleware to check if the user has admin privileges.

## Models

### Genre

Schema definition for the Genre model including validation logic.

### User

Schema definition for the User model including validation logic.

## Tests

### genres.test.js

Integration tests for the `/api/genres` routes, including setup and teardown logic to ensure a clean state for each test.

### users.test.js

Integration tests for the `/api/users` routes, including handling of duplicate registrations and successful registrations.

## Learning Objectives

This project covers the following topics:

1. Preparing the application for integration testing.
2. Setting up a test database.
3. Writing and running integration tests using Jest and Supertest.
4. Populating the test database with initial data.
5. Testing routes with parameters.
6. Validating inputs and handling errors.
7. Implementing and testing authorization middleware.
8. Writing clean and maintainable test code.

## Motivation

I am currently taking the "The Complete Node.js Course" by Code with Mosh, and I am learning the integration testing section. Due to many deprecation issues with the provided source code, I had to initialize a new project to properly follow along with the integration section. I am referencing his instructional videos and code while working through this project. This is the motivation behind creating this new project.

## Conclusion

This project provides a comprehensive setup to practice integration testing in a real-world scenario. By following the provided structure and tests, you can gain a deeper understanding of how to write robust integration tests for your Node.js applications.
