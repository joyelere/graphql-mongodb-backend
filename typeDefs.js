const { gql } = require('apollo-server-express');

// Define your GraphQL type definitions using the gql template literal
const typeDefs = gql`

    type User {
        id: ID
        firstname: String
        lastname: String
        email: String
        password: String
    }

    type Query {
        hello: String
        getAllUsers:[User]
        user(id: ID): User
    }

    input UserInput{
        firstname: String,
        lastname: String,
        email: String,
        password: String,
    }

    input UserSigninInput{
        email: String
        password: String
    }

    type Token{
        token: String
    }

    type Mutation {
        signup(newUser:UserInput): User,
        signin(userSignin:UserSigninInput): Token
      }
`;

module.exports = typeDefs;