# Document Upload Project

This project features a Laravel backend for document management and a React frontend for document uploads.

## Prerequisites

Before starting, ensure you have the following software installed on your system:

- Node.js and npm (or yarn)
- PHP >= 7.4 and Composer
- MySQL or another relational database system

## Backend Setup (document_upload)

### 1. Clone the Repository
```

git clone https://github.com/narenderrai23/document_upload.git
cd document_upload
```
### 2. Install Dependencies
```

composer install
```
### 3. Set Environment Variables
Duplicate the .env.example file and rename it to .env. Update the database connection details:

```

cp .env.example .env
```
### 4. Generate Application Key
```

php artisan key:generate
```
### 5. Migrate Database
```

php artisan migrate
```
### 6. Serve the Application
```

php artisan serve
```
## Frontend Setup (document-upload-frontend)
### 1. Navigate to the Frontend Directory
```cd ../document-upload-frontend```
### 2. Install Dependencies
```
npm install
npm run dev
```
### 3. Start the Development Server
```npm start
Your React frontend is now running at http://localhost:3000.

Usage
Laravel (Backend)
React (Frontend)
MySQL (Database)
Axios (HTTP client for API requests)
Bootstrap and react-bootstrap (Styling and UI components)```
