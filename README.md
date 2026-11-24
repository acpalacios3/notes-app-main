## Secure Record Storage

### Description

"There's an existing "Notes" API. It comes with full CRUD functionality and is protected by authentication middleware, so only registered users can use the endpoints. But here's the problem: any authenticated user can view, update, or delete any note, no matter who made it.
The task is to add authorization logic so that users can only access and manage their own notes."

This project is a Secure Record Storage API built with Node.js, Express, MongoDB, and Mongoose. It provides CRUD (Create, Read, Update, Delete) functionality for managing notes while implementing authentication and authorization to protect user data.

The main goal of this project is to ensure that authenticated users can only view, update, and delete notes that they personally own.

### Technologies:

* Node.js: JavaScript runtime environment.
* Express.js: Web framework for creating API endpoints and handling HTTP requests.
* MongoDB: NoSQL database used to store users and notes.
* Mongoose: Object Data Modeling (ODM) library for MongoDB.
* JSON Web Token (JWT): Used to authenticate users and provide access to protected API endpoints.
* Authentication Middleware: Verifies the user's JWT and identifies the authenticated user.
* Dotenv: Used to manage environment variables.

### Features:

1. Authentication

Protects the Notes API endpoints using authentication middleware.
Verifies the JWT provided by the client.
Identifies the authenticated user through the token.
Prevents unauthenticated users from accessing protected routes.

2. Authorization and Note Ownership

Associates each note with the user who created it.
Uses the authenticated user's ID to identify note ownership.
Ensures users can only access their own notes.


### API Endpoints:

The Notes API provides the following CRUD operations:

* GET: /api/notes/:id - Retrieves a specific note if it belongs to the authenticated user.
* POST: /api/notes - Creates a new note associated with the authenticated user.
* PUT: /api/notes/:id - Updates a specific note owned by the authenticated user.
* * DELETE: /api/notes/:id - Deletes a specific note owned by the authenticated user.

All endpoints require a valid JWT authentication token.

### Installation and Setup

1. Install dependencies:
npm install

2. Create a .env file in the root directory and configure the required environment variables:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000

3. Start the server:

node server.js
The server will connect to MongoDB and run on the configured port.

## Testing

The API endpoints can be tested using Postman by sending HTTP requests with the appropriate JSON data.
Include a valid JWT in the Authorization header when testing protected endpoints.

test: in the images directory

## Security

* Protected routes require authentication using JWT.
* Each note is associated with its owner.
* Authorization checks verify note ownership before allowing access.
* Users cannot modify or delete notes belonging to other users.
* User IDs are obtained from the authenticated request rather than trusted from client input.
* Environment variables are used to protect sensitive configuration values.
* The .env file is excluded from Git using .gitignore.
