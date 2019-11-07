import Nuzlocke from './NuzlockeModel';
import User from '../user/UserModel';

const NuzlockeResolvers = {
  Query: {
    getNuzlockes: async (_: any, { userId }: any) =>
    {
      return await Nuzlocke
        .find({ user: userId })
        .populate('user')
        .populate({ path: 'game', populate: { path: 'region' } })
        .populate({ path: 'pokemons', populate: { path: 'pokemon' } });
    },
    getNuzlocke: async (_: any, { id }: any) =>
    {
      return await Nuzlocke
        .findById(id)
        .populate('user')
        .populate({ path: 'game', populate: { path: 'region' } })
        .populate({ path: 'pokemons.pokemon', model: 'pokemon' });
    }
  },
  Mutation: {
    createNuzlocke: async (_: any, { input }: any) =>
    {
      const nuzlocke = await Nuzlocke.create(input);
      await User.findByIdAndUpdate(input.user, { $push: { nuzlockes: nuzlocke._id } });
      return nuzlocke.populate({ path: 'game', populate: { path: 'region' } }).execPopulate();
    },
    addPokemon: async (_: any, { id, pokemon }: any) =>
    {
      const updatedNuzlocke = await Nuzlocke
        .findByIdAndUpdate(id, { $push: { pokemons: pokemon } }, { new: true })
        .populate({ path: 'game', populate: { path: 'region' } })
        .populate({ path: 'pokemons.pokemon', model: 'pokemon' });

      return updatedNuzlocke
    }
  }
}

export default NuzlockeResolvers;