import { IUser } from './UserModel';
import { sign } from 'jsonwebtoken';
import { Response } from 'express';

import 'dotenv/config';

const jwtKey = process.env.JWT_KEY;
const cookieKey = process.env.COOKIE_KEY;

export const createAccessToken = (user: IUser) => {
  return sign(
    {
      userId: user.id,
      email: user.email
    },
    jwtKey,
    {
      expiresIn: '15m'
    }
  );
};

export const createRefreshToken = (user: IUser) => {
  return sign(
    {
      userId: user.id
    },
    cookieKey,
    {
      expiresIn: '7d'
    }
  );
};

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie('nuzlocke-helper', token, {
    httpOnly: true,
    path: '/refresh-token'
  });
};
