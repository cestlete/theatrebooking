# Backend Application

This is the backend part of our application. It is built on Node.js and connects to MongoDB for data persistence.

## Prerequisites

- Node.js (v18.17.1)
- npm(v10.5.0) or yarn
- MongoDB

## Installation

To set up the project, run the following commands:

\```bash
cd theatrebooking/backend
npm install
\```

or if you are using yarn:

\```bash
yarn install
\```

## Configuration

Create a `.env` file in the root directory of the project and update it with your MongoDB connection string and any other environment variables you need.

Example:

\```env
MONGO_URI=mongodb://localhost:27017/myapp
PORT=3000
\```

## Running the Application

To start the application, you can use either `node` or `nodemon` for development. If using `nodemon`, it will automatically restart the server on file changes.

\```bash
node server.js
\```

or with `nodemon`:

\```bash
nodemon server.js
\```

## Project Structure

- `node_modules`: Contains all npm dependencies.
- `src`: Main source directory for the application.
  - `controllers`: Controllers handle incoming HTTP requests and return responses.
  - `models`: Mongoose models for the application.
  - `routes`: Express routes which define the API endpoints.
  - `swagger`: Swagger documentation files for the API.
  - `utils`: Utility functions and helpers for the application.
- `server.js`: The entry point of the application which sets up the Express server.
- `.env`: Environment variables for configuring the application.
- `Dockerfile`: Defines the Docker configuration for building a container for the application.
- `package-lock.json`: Automatically generated file for any operations where npm modifies either the `node_modules` tree, or `package.json`.
- `package.json`: Defines npm dependencies and scripts for the project.

## API Documentation

To view the API documentation, navigate to `/api-docs` after starting the application. This documentation is powered by Swagger.
