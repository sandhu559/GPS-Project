# NavFleet Systems

This project is a GPS tracking web application that allows users to track their vehicles via a third-party GPS tracker. The application provides features such as user authentication, vehicle tracking on a map, and historical data reporting. It is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and integrates with a third-party GPS tracking device API.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (sign up, log in)
- Dashboard displaying vehicle information (location, status, battery level, last check time)
- Map page showing vehicles on a map
- Settings page for updating user information (login info, company name, address)
- Reports page for pulling historical GPS tracker data

## Technologies Used

- **Frontend**: React.js, Leaflet (for maps)
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Other**: Ngrok (for tunneling), body-parser, dotenv

## Installation

### Prerequisites

- Node.js
- npm
- MongoDB

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/gps-tracking-app.git
   cd gps-tracking-app/server
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` directory and add your MongoDB URI and port number:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the `client` directory:
   ```bash
   cd ../client
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

## Usage

1. Ensure both the backend and frontend servers are running.
2. Open your browser and navigate to `http://localhost:3000` to access the application.
3. Sign up or log in to access the dashboard.
4. Use the navigation bar to access the map, settings, and reports pages.

## Project Structure

```
gps-tracking-app/
├── server/
│   ├── models/
│   │   └── gpsData.js
│   ├── routes/
│   │   └── authRoutes.js
│   │   └── vehicleRoutes.js
│   ├── server.js
│   ├── .env
│   ├── package.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   └── Dashboard.js
│   │   │   └── Map.js
│   │   │   └── Settings.js
│   │   │   └── Reports.js
│   │   ├── App.js
│   │   ├── index.js
│   ├── public/
│   ├── .env
│   ├── package.json
└── README.md
```

## API Endpoints

### Backend

- **Webhook Endpoint**: 
  - **URL**: `/hook`
  - **Method**: POST
  - **Description**: Receives GPS data from the third-party GPS tracker and saves it to MongoDB.

- **Fetch Data Endpoint**:
  - **URL**: `/fetch-data`
  - **Method**: GET
  - **Description**: Retrieves all saved GPS data from MongoDB.

## Screenshots

![image](https://github.com/sandhu559/GPS-Project/assets/147440197/f6f42b69-c76d-403a-9ee7-05ac1eaad682)

## Contributors

- Alexis Watson
- Jenifer Torres
- Gabby Emperador
- Ishar Sandhu
- Nate Sanow

---
