## Sections
- **dashboard** 
    - port *`3000`*
    - url *`http:localhost:3000`*
    - nginxUrl *`http:localhost:8080`*

- **api**
    - port *`4000`*
    - url *`http:localhost:4000`*
    - nginxUrl *`http:localhost:8080/api/`*
    - sample end point GET:*`http:localhost:8080/api/results`*

- **nginx**
    - port *`8080`*
    - url *`http://localhost:8080`*

## Pre-requests
- Docker

## Build and Run
Execute *`docker-compose up --build`*

## Run without build
Execute *`docker-compose up`*

## URL and API end point
URL: *`http:localhost:8080`*
API END POINT: *`http:localhost:8080/api`*

# Docker
## Docker Basic Commands
- *`docker ps`* List all runing images
- *`docker images`* List all images
- *`docker system prune`* Delete all unused containers and images

# Additional Information
- Didn't focus on unit tests for both frontend and backend
- Only added the basic route validations
- Tried using nginx
- Checked for security vulnerabilities in open source libraries
- Assumed that Findings will be submitted through json input
- No validation messages in frontend
- used reactstrap for UI components
- used bootstrap as UI framework
