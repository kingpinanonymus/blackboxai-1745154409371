
Built by https://www.blackbox.ai

---

# Surplus Food Locations API

## Project Overview
The Surplus Food Locations API is a simple RESTful API built with Node.js and Express. It serves as a backend service to manage surplus food locations, providing endpoints to create new locations and retrieve a list of existing ones. This project aims to help connect those who have surplus food with those in need, promoting sustainability and reducing food waste.

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd surplus-food-locations
   ```

2. **Install dependencies**:
   Ensure you have Node.js installed. If not, download it from [Node.js website](https://nodejs.org/).

   Run the following command to install the required dependencies:
   ```bash
   npm install
   ```

3. **Start the server**:
   Once the installation is complete, you can start the server using:
   ```bash
   npm start
   ```

   The server will run on `http://localhost:3000`.

## Usage

### API Endpoints

- **Get all surplus food locations**
  - **Endpoint**: `GET /api/locations`
  - **Description**: Retrieves a list of all surplus food locations.
  - **Response**: JSON array of locations.

  Example response:
  ```json
  [
    {
      "id": 1,
      "lat": 52.5200,
      "lng": 13.4050,
      "description": "Surplus bread at bakery",
      "quantity": "20 loaves"
    }
  ]
  ```

- **Add a new surplus food location**
  - **Endpoint**: `POST /api/locations`
  - **Request Body**:
    ```json
    {
      "lat": <latitude>,
      "lng": <longitude>,
      "description": "<description>",
      "quantity": "<quantity>"
    }
    ```
  - **Description**: Adds a new surplus food location.
  - **Response**: Returns the added location with an assigned ID.

  Example request:
  ```json
  {
    "lat": 52.5200,
    "lng": 13.4050,
    "description": "Surplus fruit at market",
    "quantity": "50 apples"
  }
  ```

## Features
- RESTful API architecture
- In-memory storage for simplicity
- CORS support for client applications
- Ability to add and retrieve surplus food locations

## Dependencies
This project uses the following dependencies:
- `express`: ^5.1.0
- `cors`: ^2.8.5
- `body-parser`: ^2.2.0

These dependencies are defined in the `package.json` file.

## Project Structure
```plaintext
.
├── server.js          # Main server file
├── package.json       # Project metadata and dependencies
└── package-lock.json  # Lock file for exact package versions
```

### Description of Files:
- **server.js**: Contains the core logic for setting up the Express server, defining routes, and handling requests.
- **package.json**: Lists the project dependencies, metadata, and scripts.
- **package-lock.json**: Locks the versions of all installed packages, ensuring consistency in installations.

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests to improve the project.

--- 

By following this README, you will have a clear understanding of how to set up, use, and contribute to the Surplus Food Locations API.