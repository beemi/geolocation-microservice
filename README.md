
# Geolocation Microservice API

This project is a Node.js microservice API for geolocation-based services. It allows you to store location data and query for nearby locations based on geographic coordinates.

## Features

- Add new locations with coordinates
- Find nearby locations within a specified radius
- MongoDB for data storage
- Docker support for easy deployment and development

## Prerequisites

- Node.js (v14 or later)
- Docker and Docker Compose (for containerized setup)
- MongoDB (if running without Docker)

## Getting Started

### Local Setup

1. Clone the repository:
```
git clone https://github.com/yourusername/geolocation-microservice.git
cd geolocation-microservice
   ```

2. Install dependencies:
```
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following content:
```
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

4. Start the server:
```
node app.js
```

### Docker Setup

1. Make sure Docker and Docker Compose are installed on your system.

2. Build and run the containers:
```
docker-compose up --build
```
## API Endpoints

### Add a New Location

- **URL:** `/api/locations`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "name": "Location Name",
    "location": {
      "type": "Point",
      "coordinates": [longitude, latitude]
    }
  }
  ```
- **Success Response:**
    - **Code:** 201
    - **Content:** `{ "name": "Location Name", "location": { "type": "Point", "coordinates": [longitude, latitude] } }`

### Find Nearby Locations

- **URL:** `/api/locations/nearby`
- **Method:** `GET`
- **URL Params:**
    - `longitude=[number]`
    - `latitude=[number]`
    - `maxDistance=[number]` (in meters)
- **Success Response:**
    - **Code:** 200
    - **Content:** Array of location objects

## Project Structure

```
geolocation-microservice/
│
├── app.js                 # Main application file
├── models/
│   └── Location.js        # MongoDB model for locations
├── routes/
│   └── locations.js       # API routes for location operations
├── Dockerfile             # Dockerfile for containerization
├── docker-compose.yml     # Docker Compose configuration
├── .env                   # Environment variables (create this file)
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
```

## Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `PORT`: Port number for the server (default: 3000)

## Development

To run the application in development mode with live reloading:

1. Install nodemon: `npm install -g nodemon`
2. Run: `nodemon app.js`

## Testing

(Add information about running tests when you implement them)

## Deployment

This application can be easily deployed using Docker. Make sure to set the appropriate environment variables for your production environment.

## API Documentation

This project uses Swagger for API documentation. Once the server is running, you can access the interactive API documentation at:

http://localhost:3000/api-docs

This documentation provides detailed information about each endpoint, including:

- Available routes
- HTTP methods
- Request parameters
- Request body schemas
- Response schemas
- Example requests and responses

You can also test the API directly through the Swagger UI.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License
