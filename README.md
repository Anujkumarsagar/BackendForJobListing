# Job Listing Project

## Overview
The Job Listing Project is a web application that allows users to view and filter job listings from a MongoDB database. It is built using Node.js and Express, and it connects to a MongoDB database to fetch job data.

## Features
- View all job listings
- Filter job listings by location
- Import job data from a JSON file into the database

## Technologies Used
- **Node.js**: JavaScript runtime for building the server-side application.
- **Express**: Web framework for Node.js to handle routing and middleware.
- **MongoDB**: NoSQL database to store job listings.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **CORS**: Middleware to enable Cross-Origin Resource Sharing.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Anujkumarsagar/BackendForJobListing
   cd BackendForJobListing
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory and add your MongoDB URI:
     ```
     MONGODB_URI=<your_mongodb_uri>
     ```

## Usage

1. Start the server:
   ```bash
   npm start
   ```

2. The server will run on `http://localhost:5000`.

3. API Endpoints:
   - **GET /api/jobs**: Retrieve all job listings.
   - **GET /api/jobs/filter?location=<location>**: Filter job listings by location.

## Importing Data
To import job data from a JSON file, ensure you have a `data/jobs.json` file in the project directory. Then, uncomment the `importData()` function call in `src/app.ts` and restart the server.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License
This project is licensed under the MIT License.
