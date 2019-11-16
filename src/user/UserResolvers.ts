import User from './UserModel';

const UserResolvers = {
  Query: {
    getUser: async (_: any, { userId }: any) =>
    {
      return await User.findOne({ _id: userId }).populate('nuzlockes')
        .populate({
          path: 'nuzlockes', populate: [
            { path: 'game' },
            { path: 'pokemons.pokemon', model: 'pokemon' }
          ]
        })
    }
  },
  Mutation: {
    signUp: async (_: any, { input }: any) =>
    {
      const newUser = await User.create(input);
      return newUser;
    },
    login: async (_: any, { input }: any) =>
    {
      return User.findOne({ email: input.email })
        .then(user =>
        {
          if (!user)
          {
            throw Error('email is not registered')
          }
          if (input.password !== user.password)
          {
            throw Error('invalid credentials');
          }
          return user.populate('nuzlockes').execPopulate();
        });
    }
  }
}

export default UserResolvers;