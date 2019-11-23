import { verify } from 'jsonwebtoken';

const isAuth = (authorization: string) => {
  if (!authorization) {
    return {
      isAuth: false
    };
  }

  const token = authorization.split(' ')[1];

  let decodedToken: any;

  try {
    decodedToken = verify(token, process.env.JWT_KEY);
  } catch (error) {
    return {
      isAuth: false
    };
  }

  if (!decodedToken) {
    return {
      isAuth: false
    };
  }

  return {
    isAuth: true,
    userId: decodedToken.userId
  };
};

export default isAuth;
