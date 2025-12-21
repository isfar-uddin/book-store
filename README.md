# Book Store API

A learning project built with Node.js, Express, Drizzle ORM, and PostgreSQL to explore modern backend development practices.

## 📚 About

This is a RESTful API for managing a book store, including books, authors, and user authentication. The project demonstrates:

- Building a REST API with Express.js
- Database management with Drizzle ORM
- PostgreSQL with full-text search capabilities
- Session-based authentication
- Docker containerization for development
- Modern ES6+ JavaScript with modules

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.x
- **Database**: PostgreSQL 18.1
- **ORM**: Drizzle ORM
- **Containerization**: Docker & Docker Compose
- **Environment Management**: dotenv

## 📋 Prerequisites

Before running this project, make sure you have installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Docker](https://www.docker.com/) and Docker Compose
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd book-store
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy the `.env.example` file to create your `.env` file:

```bash
cp .env.example .env
```

Then update the values in `.env` according to your local setup.

### 4. Start PostgreSQL with Docker

```bash
docker-compose up -d
```

This will start a PostgreSQL container with:
- **Database**: book-store
- **User**: postgres
- **Password**: admin
- **Port**: 5432

### 5. Run Database Migrations

```bash
npm run db:push
```

### 6. Start the Development Server

```bash
npm start
```

The server will start on `http://localhost:8000` with auto-reload enabled.

## 📊 Database Schema

### Authors Table
- `id` (UUID) - Primary key
- `firstName` (VARCHAR 55) - Required
- `lastName` (VARCHAR 55) - Optional
- `email` (VARCHAR 255) - Required, Unique
- Full-text search index on name fields

### Books Table
- `id` (UUID) - Primary key
- `title` (VARCHAR 100) - Required
- `description` (TEXT) - Optional
- `authorId` (UUID) - Foreign key to authors, Required
- Full-text search index on title

### Users Table
- `id` (UUID) - Primary key
- `name` (VARCHAR 255) - Required
- `email` (VARCHAR 255) - Required
- `password` (TEXT) - Hashed, Required
- `salt` (TEXT) - For password hashing, Required

### Sessions Table
- `id` (UUID) - Primary key
- `userId` (UUID) - Foreign key to users, Required
- `createdAt` (TIMESTAMP) - Default now, Required

## 🔌 API Endpoints

### Books

- `GET /books` - Get all books
- `GET /books/:id` - Get a specific book
- `POST /books` - Create a new book
- `PUT /books/:id` - Update a book
- `DELETE /books/:id` - Delete a book

### Authors

- `GET /authors` - Get all authors
- `GET /authors/:id` - Get a specific author
- `POST /authors` - Create a new author
- `PUT /authors/:id` - Update an author
- `DELETE /authors/:id` - Delete an author

### Authentication (Session-based)

- `POST /session/auth/signup` - Register a new user
- `POST /session/auth/login` - Login and create a session
- `POST /session/auth/logout` - Logout and destroy session
- `GET /session/auth/me` - Get current authenticated user

## 🗂️ Project Structure

```
book-store/
├── controllers/          # Request handlers
│   ├── authorController.js
│   └── bookController.js
├── db/                   # Database connection
│   └── index.js
├── drizzle/              # Database migrations
│   ├── meta/
│   └── *.sql
├── middlewares/          # Express middlewares
│   ├── auth.js          # Authentication middleware
│   └── logger.js        # Request logging
├── models/               # Drizzle ORM schemas
│   ├── authorModel.js
│   ├── bookModel.js
│   ├── userModel.js
│   └── index.js
├── playground/           # Experimental features
│   └── sessionAuth/     # Session-based auth implementation
├── routes/               # Route definitions
│   ├── authorRouter.js
│   └── bookRouter.js
├── docker-compose.yml    # Docker configuration
├── drizzle.config.js     # Drizzle ORM configuration
├── index.js              # Application entry point
└── package.json
```

## 🔧 Available Scripts

- `npm start` - Start the development server with auto-reload
- `npm run db:push` - Push schema changes to the database
- `npm run db:studio` - Open Drizzle Studio for database management

## 🔍 Features

### Full-Text Search
The application implements PostgreSQL full-text search using GIN indexes for:
- Book titles
- Author names

### Session-Based Authentication
- Password hashing with salt
- Session management with database storage
- Protected routes with authentication middleware

### Request Logging
All requests are logged with timestamp, method, and URL information.

## 🎓 Learning Objectives

This project covers:

1. **Express.js Fundamentals**
   - Routing and middleware
   - Request/response handling
   - Error handling

2. **Drizzle ORM**
   - Schema definition
   - Migrations
   - CRUD operations
   - Relations and foreign keys

3. **PostgreSQL**
   - Table design
   - Indexes (including GIN for full-text search)
   - UUID primary keys

4. **Authentication**
   - Session-based authentication
   - Password hashing
   - Protected routes

5. **Docker**
   - Container orchestration
   - Development environment setup

## 🐛 Debugging

### View Database with Drizzle Studio

```bash
npm run db:studio
```

This opens a web interface at `https://local.drizzle.studio` to browse and edit your database.

### Check Docker Logs

```bash
docker-compose logs postgres
```

## 📄 License

ISC

## 👤 Author

isfarruett@gmail.com

---

**Happy Learning! 🚀**

