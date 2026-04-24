# Notes App

A full-stack serverless notes application built with React and AWS.

## Features
- User signup/login via Cognito
- Create, read, update, delete notes
- Notes are private per user

## Architecture

User → Cognito (auth) → API Gateway → Lambda → DynamoDB
Frontend hosted on S3 + CloudFront

## AWS Services Used
- **Cognito** — user authentication
- **API Gateway** — REST API
- **Lambda** — serverless backend (Python)
- **DynamoDB** — database
- **S3 + CloudFront** — frontend hosting