import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

require('dotenv').config();

const uri = process.env.DATABASE_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to database'))
.catch(err => console.log(err));

mongoose.set('useFindAndModify', false);

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen()
.then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})