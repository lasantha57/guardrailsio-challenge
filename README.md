# guardrailsio-challenge
GuardRails Full Stack Engineer Challenge

# Troubleshoot
Node Sass could not find a binding for your current environment: Linux 64-bit with Node.js 12.x

This usually happens because your environment has changed since running npm install.
Run 'npm rebuild node-sass' to download the binding for your current environment.

## Sections
- **web/dashboard** 
    - port `*3000*`
    - url `*http:localhost:3000*`
    - nginxUrl `*http:localhost:8080*`

- **api**
    - port `*4000*`
    - url `*http:localhost:4000*`
    - nginxUrl `*http:localhost:8080/api/*`
    - sample end point GET:`*http:localhost:8080/api/results`

- **nginx**
    - port `*8080*`
    - url `*http://localhost:8080*`

## Pre-requests
- Docker
- NodeJs
- ReactJs

## Build and Run
Execute *`docker-compose up --build`*

## Run without build
Execute *`docker-compose up`*

End Point: `*http:localhost:8080*`

# Docker
## Docker Basic Commands
- *`docker ps`* List all runing images
- *`docker images`* List all images
- *`docker system prune`* Delete all unused containers and images
