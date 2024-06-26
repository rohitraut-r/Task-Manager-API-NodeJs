# Task Manager API

A task management application built with Node.js, Express.js, and MongoDB. This app allows users to create, read, update, and delete tasks, with robust user authentication implemented using JSON Web Tokens (JWT).

## Features

- User registration and login
- Create, read, update, and delete tasks
- Secure authentication with JSON Web Tokens (JWT)
- MongoDB database integration for data persistence

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose (Object Data Modeling library)
- JSON Web Tokens (JWT)

## Getting Started

1. Clone the repository:
   git@github.com:rohitraut-r/Task-Manager-API-NodeJs.git

3. Install dependencies:
   npm install

5. Set up the environment variables:
- Create a `.env` file in the root directory
- Add the following variables:
  - `MONGODB_URI`: Your MongoDB connection string
  - `JWT_SECRET`: A secret key for JWT authentication

4. Start the server:
The app will be running at `http://localhost:3000`.


## License

This project is licensed under the [MIT License](LICENSE).
