# Geolocation Microservice API :earth_africa:

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
    "coordinates": ["longitude", latitude]
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

Certainly! Here's a section you can add to your README.md file to explain how Git tagging and releases work for this project based on the workflow we've set up:


## Versioning and Releases

This project uses GitHub Actions for automated versioning, Docker image building, and release management. Here's how it works:

### Automated Builds

On every push to the `main` branch and for every pull request:

- A Docker image is built and tagged with:
  - The short SHA of the commit
  - The branch name (for pushes to `main`)
  - The PR number (for pull requests)
- The image is pushed to GitHub Container Registry (ghcr.io)
- No Git tag or release is created for these automated builds

### Creating a Release

To create a new release:

1. Go to the "Actions" tab in the GitHub repository
2. Click on the "Build, Tag, and Release" workflow
3. Click "Run workflow"
4. Enter the version number for the new release (e.g., 1.0.0)
5. Click "Run workflow"

This process will:

1. Create a new Git tag with the specified version (e.g., v1.0.0)
2. Build a Docker image and tag it with the specified version
3. Push the Docker image to GitHub Container Registry
4. Generate a changelog based on commits since the last release
5. Create a GitHub Release with:
   - A title including the version number
   - The generated changelog
   - Docker image information and pull instructions

### Versioning Scheme

- For manual releases, we use semantic versioning (MAJOR.MINOR.PATCH)
- For automated builds, we use the format: YYYY.MM.DD-{short_sha}

### Accessing Releases

- All releases can be found in the "Releases" section of the GitHub repository
- Docker images for all builds (including non-release builds) can be found in the project's GitHub Container Registry

### Using Release Docker Images

To use a specific release version of the Docker image:

```bash
docker pull ghcr.io/USERNAME/REPO_NAME:VERSION
```

Replace `USERNAME`, `REPO_NAME`, and `VERSION` with appropriate values.

For the latest release:

```bash
docker pull ghcr.io/USERNAME/REPO_NAME:latest
```

Remember to update your deployment scripts or Kubernetes manifests to use these image tags when deploying new versions of the application.

This section provides a comprehensive overview of how versioning and releases work in your project. It covers:

1. How automated builds work for regular pushes and pull requests
2. The step-by-step process for creating a new release
3. What happens during the release process
4. The versioning scheme used for both manual releases and automated builds
5. Where to find releases and Docker images
6. How to use the Docker images from releases

