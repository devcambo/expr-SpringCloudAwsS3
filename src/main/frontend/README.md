# S3 File Manager Frontend

This is a React frontend for the S3 File Manager application, which allows users to upload, download, and delete files stored in AWS S3.

## Features

- Upload files to AWS S3
- Download files from AWS S3
- Delete files from AWS S3
- View files using presigned URLs
- Responsive design for desktop and mobile

## Technologies Used

- React.js
- Axios for API communication
- React Bootstrap for UI components
- Context API for state management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Backend server running (Spring Boot application)

### Installation

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

4. The application will be available at [http://localhost:3000](http://localhost:3000)

## API Integration

The frontend communicates with the backend using the following endpoints:

- `POST /api/files/upload` - Upload a file
- `GET /api/files/{fileName}` - Download a file
- `DELETE /api/files/{fileName}` - Delete a file
- `GET /api/files/url/{fileName}` - Get a presigned URL for viewing a file

## Development Notes

- The application uses a proxy configuration to forward API requests to the backend server at http://localhost:8080
- Mock data is used for the file list since the backend doesn't provide a list files endpoint
- The context provider (FileContext) manages state and provides methods for file operations

## Building for Production

To build the application for production:

```
npm run build
```

This will create a production-ready build in the `build` directory, which can be served by the Spring Boot application.