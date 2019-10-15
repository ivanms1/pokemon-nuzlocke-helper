import Pokemon from './PokemonModel';

const PokemonResolvers = {
  Query: {
    getPokemons: async() => {
      return await Pokemon.find();
    },
    getPokemon: async (_ : any, { id } : { id: Number}) => {
      return await Pokemon.findById(id);
    }
  }
}

export default PokemonResolvers;