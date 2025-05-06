import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import { typeDefs } from './utils/schema';
import { resolvers } from './resolvers/resolvers';
import dotenv from 'dotenv';
import * as userDatasource from './datasources/user.datasource'; // Import datasource

dotenv.config();

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      return {
        userDatasource,
      };
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 5000;

  await mongoose.connect(process.env.MONGO_URI || "", {
    dbName: 'uba-dev-lab-graphql',
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer();
