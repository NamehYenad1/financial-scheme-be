# Financial Assistance Management System

A system to manage financial assistance schemes and applications, specifically designed for system administrators to view and manage applicants and their eligibility for various schemes.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Database Seeding](#database-seeding)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Folder Structure](#folder-structure)
- [License](#license)

## Introduction

The Financial Assistance Management System allows system administrators to view, create, update, and delete financial assistance schemes. It also enables the management of applicants and their applications to these schemes.

## Features
- **User Authentication**: JWT-based authentication with role-based access control.
- **Applicants Management**: Add, update, delete, and view applicants.
- **Scheme Management**: Create, update, delete, and view financial assistance schemes.
- **Application Management**: Manage applications for various schemes based on applicant data.
- **Role-Based Access Control**: Special privileges for system administrators.
- **API Documentation**: Integrated Swagger UI for API documentation.

## Technologies Used
- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications. Chose Nest over express due to first class typescript support and also Nest encouraging a modular architecture by default, making it easier to manage and scale. It is also opionated 
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **TypeORM**: An ORM that can run in NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms and can be used with TypeScript and JavaScript.
- **PostgreSQL**: A powerful, open-source object-relational database system.
- **Passport**: Authentication middleware for Node.js.
- **Swagger**: API documentation generator for NestJS.

## Prerequisites
- Node.js (v14+)
- PostgreSQL
- Git

## Installation

### Clone the Repository:

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### Install Dependencies:

```bash
npm install
```

### Environment Variables:

Create a `.env` file in the root directory and add the following environment variables:

```makefile
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_NAME=financial_assistance_db
JWT_SECRET=your_jwt_secret
```

## Running the Application

### Start the PostgreSQL Database:

Ensure that your PostgreSQL server is running and the database is set up with the correct credentials.

### Run the Application:

```bash
npm run start:dev
```

The application will start on `http://localhost:3000`.

## Database Seeding

To populate the database with initial data (schemes, users, applicants, and applications), run the following commands:

### Seed Users:

```bash
npx ts-node src/seeds/user.seed.ts
```

### Seed Schemes:

```bash
npx ts-node src/seeds/schemes.seed.ts
```

### Seed Applicants and Applications:

```bash
npx ts-node src/seeds/application.seed.ts
```

## API Documentation

API documentation is available via Swagger. Once the application is running, you can access the Swagger UI at:

```bash
http://localhost:3000/api
```

## Testing

Run the following command to execute unit tests:

```bash
npm run test
```

## Folder Structure

- **src/auth**: Authentication and authorization logic.
- **src/users**: User management.
- **src/applicants**: Applicants management.
- **src/schemes**: Schemes management.
- **src/applications**: Applications management.
- **src/seeds**: Database seeding scripts.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
