
# Task Manager API

This is a Task Management API built using Node.js, MongoDB, and Redis.

## Table of Contents
1. [Installation](#installation)
2. [How to run the app locally](#running-locally)
3. [How to run the app locally with Docker](#running-with-docker)
4. [Environment Variables](#environment-variables)
5. [API Endpoints](#api-endpoints)
6. [Deployment](#deployment)
7. [Bonus Points](#bonus-points)

---

## Installation

To install the application and its dependencies, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/MRafiqAsim/task-manager-api.git
   ```

2. Navigate into the project directory:
   ```bash
   cd task-manager-api
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

---

## Running Locally

To run the application locally, you need Node.js , MongoDB and Redis running or better to use Docker option for an autoamted setup.

### Steps:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Ensure you have your `.env` file configured with the necessary environment variables. (See [Environment Variables](#environment-variables) section below.)

3. Run the application:
   ```bash
   npm start
   ```

By default, the API will run at `http://localhost:5001`.

---

## Running with Docker

To run the application using Docker, you can do so with Docker Compose. 

### Steps:

1. Make sure you have Docker and Docker Compose installed on your system.

2. Clone the repository if you haven't already:
   ```bash
   git clone https://github.com/MRafiqAsim/task-manager-api.git
   ```

3. Navigate to the project directory:
   ```bash
   cd task-manager-api
   ```

4. Build and start the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

   - This command will build the images and start the containers for your application, MongoDB, and Redis.
   
5. The API will be accessible at `http://localhost:5001`.

---

## Environment Variables

Make sure to configure the following environment variables in your `.env` or directly on your server (e.g., for Azure or Docker) for local and production configurations:

### Required Variables

- `PORT`: The port for the application (default: `5001`).
- `MONGO_URI`: The connection string for MongoDB (make sure it includes your MongoDB username and password for Azure in Azure env variables).
- `REDIS_HOST`: The Redis host (e.g., `redis` for local docker deployment or REDIS_URL for Azure deployment using Azure cache for redis instance).
- `REDIS_PORT`: The port for Redis (default: `6379`).
- `API_BASE_URL`: The base URL of the API (used for Swagger Docs and CORS configuration).

### Example `.env` file:

```env
PORT=5001
MONGO_URI=mongodb://mongo:27017/tasks
REDIS_HOST=redis
REDIS_PORT=6379
API_BASE_URL=http://localhost:5001
```

For production (e.g., Azure), you would set these variables accordingly (e.g., set `API_BASE_URL` to your production URL).

---

## API Endpoints

### 1. **Create a Task**

- **POST** `/api/v1/tasks`
- **Body**:
  ```json
  {
    "title": "Task Title",
    "description": "Task Description",
    "status": "in-progress"
  }
  ```

### 2. **Get All Tasks**

- **GET** `/api/v1/tasks`

### 3. **Get Task by ID**

- **GET** `/api/v1/tasks/{id}`

### 4. **Update Task**

- **PUT** `/api/v1/tasks/{id}`
- **Body**:
  ```json
  {
    "title": "Updated Title",
    "description": "Updated Description",
    "status": "completed"
  }
  ```

### 5. **Delete Task**

- **DELETE** `/api/v1/tasks/{id}`

---

## Deployment

The API is deployed to Microsoft Azure and is accessible at the following URL:

**API URL**:  
[https://taskmanagerapir-aqdpezfffpeug9em.canadacentral-01.azurewebsites.net/](https://taskmanagerapir-aqdpezfffpeug9em.canadacentral-01.azurewebsites.net/)

**Swagger Docs URL**:  
[https://taskmanagerapir-aqdpezfffpeug9em.canadacentral-01.azurewebsites.net/api-docs](https://taskmanagerapir-aqdpezfffpeug9em.canadacentral-01.azurewebsites.net/api-docs)

---

## Bonus Points
All the bonus points are covered , please see details below:

### 1. **Caching with Redis**
- Cache the task data when it's fetched. [Done]
- Invalidate the cache whenever a task is edited or deleted. [Done]
### 2. **Containerize application**
 - Containerize the application using Docker and provide instructions to run it locally using Docker Compose. [Done]
