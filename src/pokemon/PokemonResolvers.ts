import Pokemon from './PokemonModel';

const PokemonResolvers = {
  Query: {
    getPokemons: async (_: any, { game }: { game: Number }) => {
      if (game <= 3) return await Pokemon.find({ _id: { $lte: 151 } });
      if (game <= 6) return await Pokemon.find({ _id: { $lte: 251 } });
      if (game <= 11) return await Pokemon.find({ _id: { $lte: 386 } });
      if (game <= 16) return await Pokemon.find({ _id: { $lte: 493 } });
      if (game <= 22) return await Pokemon.find({ _id: { $lte: 649 } });
      if (game <= 26) return await Pokemon.find({ _id: { $lte: 721 } });

      return await Pokemon.find();
    },
    getPokemon: async (_: any, { id }: { id: Number }) => {
      return await Pokemon.findById(id);
    }
  }
};

export default PokemonResolvers;
