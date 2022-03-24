# Ticketing App

The app is a ticket selling platform for users who want to sell their tickets they don't need anymore

## Folder structure

The directory contains both service and client. For example, the `auth` is a service for authentication management.
Directories have their own readme files where needed

### infra
The folder contains all the kubernetes yamls files

### skaffold.yaml
The scaffold config yaml to automatically setup the project on development.

## Dependencies
1. Nodejs
2. Docker
3. Kubernetes
4. Skaffold

## Technologies
- NodeJs
- Express
- Typescript
- Docker
- Kubernetes
- Skaffold
- Microservice
- React
- NextJs

## Setup
1. Install docker and kubernetes
2. Install skaffold --> [Skaffold setup step](https://skaffold.dev/docs/install/)
3. Setup kubernetes secret by typing on terminal
   1. JWT_KEY
      ```bash
          k create secret generic jwt-secret --from-literal=JWT_KEY=[YOUR_SECRET_KEY]
          // example : k create secret generic jwt-secret --from-literal=JWT_KEY=sadf56sdf56dsf7
       ```
4. Form `ticketing` directory Run 
    ```bash
       skaffold dev
    ```
