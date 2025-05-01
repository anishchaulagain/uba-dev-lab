import { gql } from 'apollo-server-express';

export const typeDefs = gql`
# Object type for User entity
  type User {   
    email: String!
    name: String!
    age: Int!
  }

  # Input type for creating a new user
  input CreateUserInput {
    email: String!
    name: String!
    age: String!   # Note: age is a String here but converted to number later in validation. This is for showing error handling.
  }

   # Input type for updating an existing user
  input UpdateUserInput {
    name: String
    age: String
  }

  # Queries for retrieving data
  type Query {
    users: [User!]!
    user(email: String!): User
  }

  # Mutations for data manipulation
  type Mutation {
    createUser(input: CreateUserInput!): UserResponse!
    updateUser(email: String!, input: UpdateUserInput!): UserResponse!
    deleteUser(email: String!): UserResponse!
  }
 
   # Unified response type used for mutations
  type UserResponse {
    message: String!   #feedback message
    user: User         #User object
  }
`;