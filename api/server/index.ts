import './env';
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';

import createSchema from '../schema';
import createSession from '../session';

const port = process.env.PORT || 3000;

async function createServer() {
  try {
    // 1. Create Mongoose Connection
    await createSession();
    // 2. Create Express server
    const app = express();

    const corsOptions = {
      origin: 'https://localhost:3000',
      credentials: true,
    };

    app.use(cors(corsOptions));

    // use JSON requests
    app.use(express.json());

    const schema = await createSchema();

    // 3. create GraphQL server
    const apolloServer = new ApolloServer({
      schema,
      context: ({ req, res }) => ({ req, res }),
      // allows playground
      introspection: true,
      // Turn on playground
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
    });

    apolloServer.applyMiddleware({ app, cors: corsOptions });

    // start the apollo server
    app.listen({ port }, () => {
      console.log(
        `Server running on port ${port} - ApolloServer graphql path ${apolloServer.graphqlPath}`
      );
    });
  } catch (err) {
    console.log(err);
  }
}

createServer();
