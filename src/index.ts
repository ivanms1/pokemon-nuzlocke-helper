import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { verify } from 'jsonwebtoken';
import 'dotenv/config';

import typeDefs from './typeDefs';
import resolvers from './resolvers';
import isAuth from './isAuth';
import User from './user/UserModel';
import {
  createRefreshToken,
  createAccessToken,
  sendRefreshToken
} from './user/auth';

const uri = process.env.DATABASE_URI;

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

app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
);

app.post('/refresh-token', async (req, res) => {
  const token = req.cookies['nuzlocke-helper'];
  if (!token) {
    return res.send({ ok: false, accessToken: '' });
  }

  let payload: any = null;
  try {
    payload = verify(token, process.env.COOKIE_KEY);
  } catch (error) {
    console.log(error);
    return res.send({ ok: false, accessToken: '' });
  }

  const user = await User.findById(payload.userId);

  if (!user) {
    return res.send({ ok: false, accessToken: '' });
  }

  sendRefreshToken(res, createRefreshToken(user));

  return res.send({ ok: true, accessToken: createAccessToken(user) });
});

server.applyMiddleware({
  app,
  cors: false
});

const PORT = process.env.PORT || 4000;

app.listen({ port: PORT }, () =>
  console.log(
    `🚀  Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
);
