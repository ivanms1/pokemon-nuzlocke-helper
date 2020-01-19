import Nuzlocke from './NuzlockeModel';
import User from '../user/UserModel';

const NuzlockeResolvers = {
  Query: {
    getNuzlockes: async (_: any, { userId }: any, { isAuth }: any) => {
      return await Nuzlocke.find({ user: userId })
        .populate('user')
        .populate({ path: 'game', populate: { path: 'region' } })
        .populate({ path: 'pokemons', populate: { path: 'pokemon' } })
        .populate({ path: 'pokemons.partner', model: 'pokemon' });
    },
    getNuzlocke: async (_: any, { id }: any, { isAuth }: any) => {
      if (!isAuth) {
        throw Error('Not Authorized');
      }
      return await Nuzlocke.findById(id)
        .populate('user')
        .populate({ path: 'game', populate: { path: 'region' } })
        .populate({ path: 'pokemons.pokemon', model: 'pokemon' })
        .populate({ path: 'pokemons.partner', model: 'pokemon' });
    }
  },
  Mutation: {
    createNuzlocke: async (_: any, { input }: any, { isAuth }: any) => {
      if (!isAuth) {
        throw Error('Not Authorized');
      }
      const nuzlocke = await Nuzlocke.create(input);
      await User.findByIdAndUpdate(input.user, {
        $push: { nuzlockes: nuzlocke._id }
      });
      return nuzlocke
        .populate({ path: 'game', populate: { path: 'region' } })
        .execPopulate();
    },
    addPokemon: async (_: any, { id, pokemon }: any, { isAuth }: any) => {
      if (!isAuth) {
        throw Error('Not Authorized');
      }
      const updatedNuzlocke = await Nuzlocke.findByIdAndUpdate(
        id,
        { $push: { pokemons: pokemon } },
        { new: true }
      )
        .populate({ path: 'game', populate: { path: 'region' } })
        .populate({ path: 'pokemons.pokemon', model: 'pokemon' })
        .populate({ path: 'pokemons.partner', model: 'pokemon' });

      return updatedNuzlocke;
    },
    updatePokemon: async (_: any, { id, pokemon }: any, { isAuth }: any) => {
      if (!isAuth) {
        throw Error('Not Authorized');
      }
      const updatedNuzlocke = await Nuzlocke.findOneAndUpdate(
        { _id: id, 'pokemons._id': pokemon.id },
        { $set: { 'pokemons.$': pokemon } },
        { new: true }
      )
        .populate({ path: 'game', populate: { path: 'region' } })
        .populate({ path: 'pokemons.pokemon', model: 'pokemon' })
        .populate({ path: 'pokemons.partner', model: 'pokemon' });

      return updatedNuzlocke;
    },
    deletePokemon: async (_: any, { id, pokemonId }: any, { isAuth }: any) => {
      if (!isAuth) {
        throw Error('Not Authorized');
      }
      await Nuzlocke.findOneAndUpdate(
        { _id: id },
        { $pull: { pokemons: { _id: pokemonId } } }
      );

      return pokemonId;
    }
  }
};

export default NuzlockeResolvers;
