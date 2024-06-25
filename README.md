# document_upload
Document Upload Project
This project features a Laravel backend for document management and a React frontend for document uploads.

Prerequisites
Before starting, ensure you have the following software installed on your system:

Node.js and npm (or yarn)
PHP >= 7.4 and Composer
MySQL or another relational database system
Backend Setup (document_upload)
1. Clone the Repository
bash
Copy code
git clone https://github.com/narenderrai23/document_upload.git
cd document_upload
2. Install Dependencies
bash
Copy code
composer install
3. Set Environment Variables
Duplicate the .env.example file and rename it to .env. Update the database connection details:

bash
Copy code
cp .env.example .env
4. Generate Application Key
bash
Copy code
php artisan key:generate
5. Migrate Database
bash
Copy code
php artisan migrate
6. Serve the Application
bash
Copy code
php artisan serve
Your Laravel backend is now running at http://localhost:8000.

Frontend Setup (document-upload-frontend)
1. Navigate to the Frontend Directory
bash
Copy code
cd ../document-upload-frontend
2. Install Dependencies
bash
Copy code
npm install
3. Configure API Endpoint
Update the API base URL in src/api.js to match your backend URL:

javascript
Copy code
// src/api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api', // Update this URL
});

export default instance;
4. Start the Development Server
bash
Copy code
npm start
Your React frontend is now running at http://localhost:3000.

Usage
Access the frontend application at http://localhost:3000.
Use the document upload form to upload PDF or DOCX files.
Uploaded documents will be stored in the backend and displayed on the frontend.
Technologies Used
Laravel (Backend)
React (Frontend)
MySQL (Database)
Axios (HTTP client for API requests)
Bootstrap and react-bootstrap (Styling and UI components)