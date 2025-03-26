# **Movie Management Application - Backend with NestJS**

## 👀 **Project Description:**

The goal of this project is to develop a backend application using **NestJS** to manage movies. The application should meet the following requirements:

### 1. 🔑 **Authentication and Authorization:**

Implement an authentication and authorization system that allows users to register, log in, and obtain an access token. Use **JWT (JSON Web Tokens)** for authentication.

### 2. 👥 **User Management:**

Implement the necessary endpoints for user registration (sign-up) and login. When a new user is registered, store their information in a database and apply necessary validations.

### 3. 🤖 **API Endpoints:**

- **User Registration Endpoint**: Allows users to register.
- **Login Endpoint**: Allows users to log in and obtain an access token.
- **Movies List Endpoint**: Allows users to retrieve the list of movies.
- **Movie Details Endpoint**: Retrieves the details of a specific movie. This endpoint should be restricted to "Regular Users."
- **Create Movie Endpoint**: Allows the creation of a new movie. This endpoint should be accessible only to "Admins."
- **Update Movie Endpoint**: Allows updating the details of an existing movie. This endpoint should be restricted to "Admins."
- **Delete Movie Endpoint**: Allows deleting a movie. This endpoint should be restricted to "Admins."
- **Synchronization Endpoint or Cron Job**: Synchronizes the movie list with data from the Star Wars API. This should be accessible only to "Admins" if it's an endpoint, or set up as a cron job.

---

## 📜 **Project Setup:**

### 1. Prerequisites:

Before you begin, make sure you have the following software installed on your machine:

- **Docker**: Used to run the database in a containerized environment.  
  You can download and install Docker from here: [Docker Official Website](https://www.docker.com/products/docker-desktop)

- **Node.js**: Used to run the backend application.  
  You can download and install Node.js from here: [Node.js Official Website](https://nodejs.org/en/download/)

### 2. Clone the Repository:

```bash
git clone <repository_url>
```

### 3. Navigate to the project directory

Change to your project directory:

```bash
cd <project_folder>
```

### 4. Install node dependencies

To install all the dependencies required for the project, run:

```bash
npm run install
```

### 5. Install MongoDB using Docker

Then, run the following command to start MongoDB in a container:

```bash
docker-compose up -d
```

### 6. Configure environment variables 

Create a .env file in the root directory of the project and add the following environment variables:

```bash
MONGODB_URI=mongodb://localhost:27017/movie-management
JWT_SECRET=<your_jwt_secret>
```

Replace <your_jwt_secret> with a secret string for signing JWT tokens.

### 7. Run the application

After installing dependencies and configuring the environment, you can start the application with:

```bash
npm run start:dev
```

## 📜 **API documentation**

This project uses Graphql with [Apollo](https://www.apollographql.com/docs/apollo-server/)