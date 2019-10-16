import User from './UserModel';

const UserResolvers = {
  Mutation: {
    signUp: async (_: any, { input }: any) =>
    {
      return await User.create(input);
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
          return user.populate('nuzlocke').execPopulate();
        });
    }
  }
}

export default UserResolvers;