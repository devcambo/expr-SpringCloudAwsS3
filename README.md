# Spring Cloud AWS S3 Integration

[![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://openjdk.java.net/projects/jdk/21/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.0-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Spring Cloud AWS](https://img.shields.io/badge/Spring%20Cloud%20AWS-3.3.1-blue.svg)](https://spring.io/projects/spring-cloud-aws)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A demonstration project showcasing file storage operations using Spring Cloud AWS S3 integration with LocalStack for local development and testing.

## 📋 Description

This Spring Boot application provides a RESTful API for file storage operations using Amazon S3. It demonstrates how to integrate AWS S3 services into a Spring Boot application using Spring Cloud AWS, with LocalStack providing a local AWS cloud stack for development and testing purposes.

The project enables developers to:
- Upload files to S3 buckets
- Download files from S3 storage
- Delete files from S3 buckets
- Generate presigned URLs for secure file access

## ✨ Features

- **File Upload**: Upload multipart files to S3 with automatic unique filename generation
- **File Download**: Retrieve files directly from S3 storage
- **File Deletion**: Remove files from S3 buckets
- **Presigned URLs**: Generate temporary URLs for secure file access
- **LocalStack Integration**: Local AWS services emulation for development
- **Docker Support**: Easy setup with Docker Compose
- **RESTful API**: Clean REST endpoints for all file operations

## 📑 Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## 🚀 Installation

### Prerequisites

- **Java 21** or higher
- **Maven 3.6+**
- **Docker** and **Docker Compose**

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/expr-SpringCloudAwsS3.git
   cd expr-SpringCloudAwsS3
   ```

2. **Start LocalStack services**
   ```bash
   docker-compose up -d
   ```
   This will start LocalStack with S3 and SQS services, and automatically create the required S3 bucket (`my-bucket`).

3. **Build the application**
   ```bash
   ./mvnw clean compile
   ```

4. **Run the application**
   ```bash
   ./mvnw spring-boot:run
   ```

The application will start on `http://localhost:8080`.

## ⚙️ Configuration

### Environment Variables

The application can be configured using the following environment variables:

| Variable | Default Value | Description |
|----------|---------------|-------------|
| `AWS_ACCESS_KEY` | `000000000000` | AWS Access Key ID (LocalStack default) |
| `AWS_SECRET_KEY` | `000000000000` | AWS Secret Access Key (LocalStack default) |
| `AWS_REGION` | `us-east-1` | AWS Region |
| `AWS_ENDPOINT` | `http://s3.localhost.localstack.cloud:4566` | S3 Endpoint URL |

### Application Configuration

The main configuration is located in `src/main/resources/application.yml`:

```yaml
spring:
  application:
    name: expr-SpringCloudAwsS3
  cloud:
    aws:
      credentials:
        access-key: "${AWS_ACCESS_KEY:000000000000}"
        secret-key: "${AWS_SECRET_KEY:000000000000}"
      s3:
        region: "${AWS_REGION:us-east-1}"
        endpoint: "${AWS_ENDPOINT:http://s3.localhost.localstack.cloud:4566}"
```

## 📖 Usage

### Basic Usage Example

1. **Upload a file**
   ```bash
   curl -X POST \
     -F "file=@/path/to/your/file.txt" \
     http://localhost:8080/api/files/upload
   ```

2. **Download a file**
   ```bash
   curl -X GET \
     http://localhost:8080/api/files/{fileName} \
     --output downloaded-file.txt
   ```

3. **Generate a presigned URL**
   ```bash
   curl -X GET \
     http://localhost:8080/api/files/url/{fileName}
   ```

4. **Delete a file**
   ```bash
   curl -X DELETE \
     http://localhost:8080/api/files/{fileName}
   ```

## 🔗 API Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/api/files/upload` | Upload a file | `multipart/form-data` with `file` field | `200 OK` |
| GET | `/api/files/{fileName}` | Download a file | None | File content (`application/octet-stream`) |
| DELETE | `/api/files/{fileName}` | Delete a file | None | `204 No Content` |
| GET | `/api/files/url/{fileName}` | Generate presigned URL | None | Presigned URL (valid for 1 minute) |

### Example Responses

**Successful Upload:**
```http
HTTP/1.1 200 OK
Content-Length: 0
```

**Presigned URL Response:**
```json
"https://my-bucket.s3.localhost.localstack.cloud:4566/uuid-filename.txt?X-Amz-Algorithm=..."
```

## 📁 Project Structure

```
├── src/
│   ├── main/
│   │   ├── java/com/devcambo/cloudawss3/
│   │   │   ├── controller/
│   │   │   │   └── FileController.java      # REST API endpoints
│   │   │   ├── service/
│   │   │   │   └── StorageService.java      # S3 operations service
│   │   │   └── Cloudawss3Application.java   # Spring Boot main class
│   │   └── resources/
│   │       └── application.yml              # Application configuration
│   └── test/
├── localstack/
│   └── init-aws.sh                          # LocalStack initialization script
├── docker-compose.yml                       # Docker services configuration
├── pom.xml                                  # Maven dependencies
└── README.md
```

## 🛠️ Development

### Running Tests

```bash
./mvnw test
```

### Building for Production

To build a production-ready JAR:

```bash
./mvnw clean package
```

The JAR file will be created in the `target/` directory.

### Using with Real AWS

To use with actual AWS S3 instead of LocalStack:

1. Remove or comment out the `endpoint` configuration in `application.yml`
2. Set proper AWS credentials:
   ```bash
   export AWS_ACCESS_KEY=your-actual-access-key
   export AWS_SECRET_KEY=your-actual-secret-key
   export AWS_REGION=your-preferred-region
   ```
3. Ensure the S3 bucket exists in your AWS account

### LocalStack Management

**Check LocalStack status:**
```bash
docker-compose ps
```

**View LocalStack logs:**
```bash
docker-compose logs localstack
```

**Stop LocalStack:**
```bash
docker-compose down
```

**Reset LocalStack data:**
```bash
docker-compose down
rm -rf volume/
docker-compose up -d
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Follow standard Java coding conventions
- Use Lombok annotations appropriately
- Write meaningful commit messages
- Add tests for new functionality

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Spring Cloud AWS](https://spring.io/projects/spring-cloud-aws) - AWS integration for Spring
- [LocalStack](https://localstack.cloud/) - Local AWS cloud stack
- [Spring Boot](https://spring.io/projects/spring-boot) - Application framework
- [Project Lombok](https://projectlombok.org/) - Java library for reducing boilerplate code

## 📞 Support

If you have any questions or run into issues, please:

1. Check the existing [Issues](https://github.com/yourusername/expr-SpringCloudAwsS3/issues)
2. Create a new issue if your problem isn't already documented
3. Provide detailed information about your environment and the issue

---

**Happy coding!** 🚀
