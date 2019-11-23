import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

import typeDefs from './typeDefs';
import resolvers from './resolvers';
import isAuth from './isAuth';

const uri = process.env.DATABASE_URI;

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: false
};

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  .catch(err => console.log(err));

mongoose.set('useFindAndModify', false);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ res, req }) => {
    return {
      res,
      ...isAuth(req.headers.authorization)
    };
  }
});

const app = express();

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀  Server ready at http://localhost:4000${server.graphqlPath}`)
);
