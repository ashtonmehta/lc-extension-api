# LC Chrome Extension API

This is the API for the LC Chrome Extension project.

## Tech Stack

- **Node.js**
- **Express**
- **Express-Validator**
- **TypeORM**
- **PostgreSQL**

## Requirements

- **Node.js**
- **Docker**

## Setup Instructions

### 1. Install Dependencies

Run the `npm install` command

### 2. Configure Database

Edit the `data-source.ts` file to match your database settings

### 3. Set Environment Variables

Create a `.env` file in the root directory and add the following variables:

```
DB_USERNAME
DB_PASSWORD
POSTGRES_USER
POSTGRES_PASSWORD
PORT
```

### 4. Start the Database

Run `docker compose up -d` to start the database

### 5. Run the Development Server

Run the `npm run dev` command

### 6. Stop the Database

Run `docker compose down` to stop the database (when you're done)
