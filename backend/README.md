# CareerPort — Spring Boot Backend (Member 2)

## Overview

This is the **REST API backend** for the CareerPort Student Opportunity Hub project. Built with:
- **Java 17** + **Spring Boot 3.2**
- **Spring Security** + **JWT** (stateless authentication)
- **Spring Data JPA** + **MySQL**
- **Lombok** for boilerplate reduction

---

## Prerequisites

- Java 17+ installed
- Maven 3.8+ installed
- MySQL 8.0 running locally (or RDS endpoint from Member 3)

---

## Setup & Run

### 1. Create the MySQL database
```sql
CREATE DATABASE careerport_db;
```

### 2. Configure database credentials

Edit `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/careerport_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

> **Member 3 (AWS):** Replace `localhost` with your **RDS endpoint URL**.

### 3. Run the backend
```bash
cd backend
mvn spring-boot:run
```

The server starts at **http://localhost:8080**

### 4. Seed sample data (optional but recommended)
After first run (tables are auto-created), run:
```sql
-- Run the SQL from src/main/resources/data.sql in your MySQL client
```

---

## API Endpoints

### Authentication (No token required)
| Method | URL | Description |
|--------|-----|-------------|
| POST | `/api/auth/register` | Create new student account |
| POST | `/api/auth/login` | Login and receive JWT token |

### Profile (JWT required)
| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/profile` | Get logged-in student's profile |
| PUT | `/api/profile` | Update profile details |
| POST | `/api/profile/upload-resume` | Upload resume file (multipart) |

### Opportunities (JWT required)
| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/opportunities` | List all opportunities |
| POST | `/api/opportunities` | Add new opportunity |
| PUT | `/api/opportunities/{id}` | Update opportunity |

### Recommendations (JWT required)
| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/recommendations` | Get personalized skill-matched recommendations |

### Applications (JWT required)
| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/applications` | Get student's applications |
| POST | `/api/applications` | Apply to an opportunity |
| PUT | `/api/applications/{id}/status` | Update application status |

---

## JWT Authentication

All protected endpoints require:
```
Authorization: Bearer <your-jwt-token>
```

Get the token from `POST /api/auth/login` response.

---

## Project Structure

```
backend/
├── pom.xml
└── src/main/java/com/careerport/
    ├── CareerPortApplication.java   ← entry point
    ├── config/
    │   ├── SecurityConfig.java      ← JWT + CORS config
    │   └── WebConfig.java           ← Static file serving
    ├── controller/                  ← REST endpoints (5 controllers)
    ├── dto/                         ← Request/Response DTOs
    ├── entity/                      ← JPA Entities (4 tables)
    ├── repository/                  ← JPA Repositories
    ├── security/
    │   ├── JwtUtil.java             ← Token generation/validation
    │   └── JwtFilter.java           ← Auth filter
    └── service/                     ← Business logic (5 services)
```

---

## For Member 3 (AWS Integration)

### RDS Integration
Change in `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://YOUR-RDS-ENDPOINT:3306/careerport_db?...
spring.datasource.username=admin
spring.datasource.password=YOUR_RDS_PASSWORD
```

### S3 Resume Upload
In `ProfileService.java`, the `uploadResume()` method has a clear comment:
```java
// MEMBER 3 INTEGRATION POINT:
// Replace the local file saving below with AWS S3 upload.
// Example: use AmazonS3Client.putObject() and return the S3 URL.
```

Replace local file save with:
```java
// Add aws-java-sdk-s3 dependency to pom.xml
AmazonS3 s3 = AmazonS3ClientBuilder.standard()
    .withRegion("us-east-1")
    .build();
s3.putObject(bucketName, fileName, file.getInputStream(), metadata);
return "https://YOUR-BUCKET.s3.amazonaws.com/" + fileName;
```

### EC2 Deployment
```bash
# Build JAR
mvn clean package -DskipTests

# Run on EC2
java -jar target/careerport-backend-1.0.0.jar \
  --spring.datasource.url=jdbc:mysql://YOUR-RDS:3306/careerport_db \
  --spring.datasource.password=YOUR_PASSWORD
```

---

## For Member 4 (Testing & Data)

### Sample API Testing with curl

```bash
# 1. Register
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test Student","email":"test@test.com","phoneNumber":"9876543210","department":"CSE","password":"password123"}'

# 2. Login (save the token!)
TOKEN=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}' | python -c "import sys,json; print(json.load(sys.stdin)['token'])")

# 3. Get opportunities
curl http://localhost:8080/api/opportunities -H "Authorization: Bearer $TOKEN"

# 4. Get recommendations
curl http://localhost:8080/api/recommendations -H "Authorization: Bearer $TOKEN"
```

### Adding Sample Data
Run the SQL in `src/main/resources/data.sql` in your MySQL client after first startup.
