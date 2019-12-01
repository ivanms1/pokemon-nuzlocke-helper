import User from './UserModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  createRefreshToken,
  createAccessToken,
  sendRefreshToken
} from './auth';

const UserResolvers = {
  Query: {
    getUser: async (_: any, { userId }: any) => {
      return await User.findOne({ _id: userId })
        .populate('nuzlockes')
        .populate({
          path: 'nuzlockes',
          populate: [
            { path: 'game' },
            { path: 'pokemons.pokemon', model: 'pokemon' },
            { path: 'pokemons.partner', model: 'pokemon' }
          ]
        });
    },
    getCurrentUser: async (_: any, args: any, { userId }: any) => {
      return await User.findById(userId);
    }
  },
  Mutation: {
    signUp: async (_: any, { input }: any, { res }: any) => {
      const { email } = input;
      const user = await User.findOne({ email });

      if (user) throw Error('Email already registered');

      const hashedPassword = await bcrypt.hashSync(input.password, 10);
      input.password = hashedPassword;

      const newUser = await User.create(input);

      const token = createAccessToken(newUser);

      sendRefreshToken(res, createRefreshToken(newUser));

      return {
        userId: newUser.id,
        token,
        tokenExpiration: 3
      };
    },
    login: async (_: any, { input }: any, { res }: any) => {
      const { password } = input;

      const user = await User.findOne({ email: input.email });

      if (!user) {
        throw Error('email is not registered');
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new Error('Invalid credentials');
      }

      const token = createAccessToken(user);

      res.cookie('nuzlocke-helper', createRefreshToken(user), {
        httpOnly: true
      });

      return {
        userId: user.id,
        token,
        tokenExpiration: 3
      };
    }
  }
};

export default UserResolvers;
