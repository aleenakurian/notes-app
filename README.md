# Notes App

A full-stack serverless notes application built with React and AWS.

A personal notes app where you can securely create, edit, and delete your own private notes.

## Architecture

User → Cognito (auth) → API Gateway → Lambda → DynamoDB

Frontend hosted on S3 + CloudFront

## AWS Services Used
- **Cognito** — user authentication
- **API Gateway** — REST API
- **Lambda** — serverless backend (Python)
- **DynamoDB** — database
- **S3 + CloudFront** — frontend hosting
