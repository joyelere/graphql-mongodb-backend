// Import required packages and modules
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const MONGODB_URI = require('./config');
const typeDefs = require('./typeDefs'); // Import GraphQL type definitions
const resolvers = require('./resolvers'); // Import GraphQL resolvers
const mongoose = require('mongoose'); // Import Mongoose for database

async function startServer() {
    const app = express(); // Create an Express.js application

    // Create an Apollo Server instance and configure it with type definitions and resolvers
    const apolloServer = new ApolloServer({
        typeDefs, // GraphQL type definitions
        resolvers, // GraphQL resolvers
    });

    await apolloServer.start(); // Start the Apollo Server

    // Apply the Apollo Server middleware to your Express application
    apolloServer.applyMiddleware({ app });

    // Define a simple route in case a request is not a GraphQL request
    app.use((req, res) => {
        res.send("Hello from express");
    });

    const PORT = process.env.PORT || 3000; // Define the port for the server

    // Connect to MongoDB database
    await mongoose.connect('mongodb://127.0.0.1:27017/user_db', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log('Mongoose connected....'); // Log that the database is connected

    // Start the Express server
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

startServer(); // Call the startServer function to start the server
