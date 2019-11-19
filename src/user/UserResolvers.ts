import User from './UserModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

require('dotenv').config();

const jwtKey = process.env.JWT_KEY;

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
    }
  },
  Mutation: {
    signUp: async (_: any, { input }: any) => {
      const { email } = input;
      const user = await User.findOne({ email });

      if (user) throw Error('Email already registered');

      const hashedPassword = await bcrypt.hashSync(input.password, 10);
      input.password = hashedPassword;

      const newUser = await User.create(input);

      const token = jwt.sign(
        {
          userId: newUser.id,
          email: newUser.email
        },
        jwtKey,
        {
          expiresIn: '3h'
        }
      );

      return {
        userId: newUser.id,
        token,
        tokenExpiration: 3
      };
    },
    login: async (_: any, { input }: any) => {
      const { password } = input;

      const user = await User.findOne({ email: input.email });

      if (!user) {
        throw Error('email is not registered');
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email
        },
        jwtKey,
        {
          expiresIn: '3h'
        }
      );

      return {
        userId: user.id,
        token,
        tokenExpiration: 3
      };
    }
  }
};

export default UserResolvers;
