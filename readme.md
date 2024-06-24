# Advanced Integration Testing Demo

This project is designed to help you learn and practice integration testing in a Node.js environment using Express and MongoDB. It includes various features and testing scenarios such as setting up a test database, validating inputs, testing routes with parameters, and handling authorization.

## Project Overview

I am currently taking "The Complete Node.js Course" by Code with Mosh, and I am learning the integration testing section. Due to many deprecation issues with the provided source code, I had to initialize a new project to properly follow along with the integration section. I am referencing his instructional videos and code while working through this project. This is the motivation behind creating this new project.

## Challenges and Solutions

1. **Deprecation Issues** :
   - Updated deprecated dependencies to ensure project stability and security.
2. **Integration Test Port Conflicts** :
   - Ensured each test file uses a different port to avoid conflicts.
   - Attempted to use `get-port` for dynamic port allocation but faced syntax errors. This will be revisited in the future.
3. **Joi Validation** :
   - Updated Joi validation method to `schema.validate` to comply with the newer version.
4. **Error Handling Middleware** :
   - Implemented error handling middleware to catch unhandled errors and return a 500 status code.

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

This command runs Jest with the `--watchAll`, `--verbose`, and `--coverage` flags, providing a comprehensive testing experience.

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

## Recap: Integration Tests

In this section, I learned that:

- **Unit tests** are easy to write, fast to execute, and are ideal for testing functions with minimal or zero dependency on external resources.
- The more you use **mock functions** , the more your tests get coupled to the current implementation. Changing this implementation in the future may break your tests. If you find yourself doing too much mocking, it's time to replace your unit test with an integration test.
- With **integration tests** , we test our application with a real database. It's a best practice to separate your test database from the development or production databases.
- You should write each integration test as if it is the only test in the world. Start with a clean state (database). Populate the database only with the data required by the test, nothing more, nothing less. Clean up after your test using the `afterEach` function.
- Run Jest with the `--coverage` flag to get a code coverage report.

## Future Work

- Resolve the dynamic port allocation issue using `get-port` or an alternative method.
- Enhance test coverage and further refine error handling mechanisms.
- Continue exploring more advanced testing strategies and tools to improve overall test effectiveness.
- Deploy through Heroku

## Conclusion

This project provides a comprehensive setup to practice integration testing in a real-world scenario. By following the provided structure and tests, you can gain a deeper understanding of how to write robust integration tests for your Node.js applications.
