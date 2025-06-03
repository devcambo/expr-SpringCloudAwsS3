# S3 File Manager

A full-stack application for managing files in AWS S3, featuring a Spring Boot backend and React frontend.

## Project Overview

This project demonstrates how to build a file management system using AWS S3 for storage. It consists of:

1. **Backend**: Spring Boot application with AWS S3 integration
2. **Frontend**: React application with context provider and axios for API communication

## Features

- Upload files to AWS S3
- Download files from AWS S3
- Delete files from AWS S3
- View files using presigned URLs
- Responsive UI for desktop and mobile

## Technology Stack

### Backend
- Java 17
- Spring Boot
- Spring Cloud AWS
- AWS S3
- LocalStack (for local development)

### Frontend
- React.js
- Axios
- React Bootstrap
- Context API

## Getting Started

### Prerequisites
- Java 17 or higher
- Maven
- Docker and Docker Compose (for LocalStack)
- Node.js and npm (for frontend development)

### Running the Backend

1. Start the LocalStack container:
   ```
   docker-compose up -d
   ```

2. Run the Spring Boot application:
   ```
   ./mvnw spring-boot:run
   ```

3. The backend will be available at http://localhost:8080

### Running the Frontend

1. Navigate to the frontend directory:
   ```
   cd src/main/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. The frontend will be available at http://localhost:3000

## API Endpoints

- `POST /api/files/upload` - Upload a file
- `GET /api/files/{fileName}` - Download a file
- `DELETE /api/files/{fileName}` - Delete a file
- `GET /api/files/url/{fileName}` - Get a presigned URL for viewing a file

## Project Structure

- `src/main/java/com/devcambo/cloudawss3/controller` - REST controllers
- `src/main/java/com/devcambo/cloudawss3/service` - Business logic and S3 operations
- `src/main/resources` - Application configuration
- `src/main/frontend` - React frontend application
- `localstack` - LocalStack configuration for local AWS services

## Development Notes

- The application uses LocalStack to simulate AWS S3 locally
- The frontend uses a proxy configuration to forward API requests to the backend
- Files are stored with unique names generated using UUID
