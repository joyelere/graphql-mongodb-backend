# GraphQL and MongoDB Services

A simple GraphQL-based backend service with authentication and MongoDB integration.

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [GraphQL Endpoints](#graphql-endpoints)
- [Built With](#built-with)
- [License](#license)

## Introduction

This project consists of two services: a basic GraphQL backend service and a service responsible for MongoDB schema models and GraphQL type definitions updates. The GraphQL service provides authentication endpoints (Signup & signin), and it dynamically incorporates the schema and type definitions from the second service during deployment.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) and npm installed
- MongoDB installed and running locally (or a MongoDB connection URL)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/joyelere/graphql-mongodb-backend.git

2. Navigate to the project directory:
   ```bash
   cd graphql-mongodb-backend

3. Install dependencies:

   npm install

4.  Configure the application by editing the **config.js** file in the project root. Update the JWT secret key as needed

5.  Start the server:
    ```bash
    npm run dev


## Usage

To interact with the API, we make use of GraphQL Playground, a user-friendly interface for sending queries and mutations to your GraphQL server.

1. **Access GraphQL Playground**: Open a web browser and navigate to the URL where your GraphQL server is running. Typically, it's available at `http://localhost:PORT/graphql`, where `PORT` is the port number your server is running on.

## GraphQL Endpoints

### Signup

This mutation allows users to sign up and create a new account. It requires providing user details including `firstname`, `lastname`, `email`, and `password`.

<details>
<summary>Click to expand</summary>
  
```graphql
mutation {
  signup(newUser: {
    firstname: "John",
    lastname: "Doe",
    email: "johndoe@example.com",
    password: "password123"
  }) {
    id
    firstname
    lastname
    email
  }
}
</details>

```

### Signin

This mutation allows users to sign in by providing their registered `email` and `password`. It returns a JWT token upon successful authentication.

<details>
<summary>Click to expand</summary>
  
```graphql
mutation {
  signin(userSignin: {
    email: "johndoe@example.com",
    password: "password123"
  }) {
    token
  }
}
</details>
```

### Get All Users

This query retrieves a list of all users in the system, including their `id`, `firstname`, `lastname`, and `email`.

<details>
<summary>Click to expand</summary>
  
```graphql
query {
  getAllUsers {
    id
    firstname
    lastname
    email
  }
}

</details>
```

### Get User by ID

This query allows you to fetch a user's information by specifying their `id`.

<details>
<summary>Click to expand</summary>
  
```graphql
query {
  user(id: "user_id_here") {
    id
    firstname
    lastname
    email
  }
}

</details>
```

## Built With

- [Node.js](https://nodejs.org/): A JavaScript runtime for building server-side applications.
- [Express.js](https://expressjs.com/): A fast and minimalist web framework for Node.js.
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/): A GraphQL server implementation that connects your GraphQL schema to your data sources.
- [GraphQL](https://graphql.org/): A query language for your API, and a server-side runtime for executing those queries by specifying the types for your data.
- [MongoDB](https://www.mongodb.com/): A NoSQL database that provides high-performance, flexible schema data storage.


## License

This project is licensed under the [MIT License](LICENSE).


