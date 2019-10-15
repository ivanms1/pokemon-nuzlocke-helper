import Game from './GameModel';

const GameResolvers = {
  Query: {
    getGames: async() => {
      return await Game.find().populate('region');
    },
    getGame: async (_ : any, { id } : { id: Number}) => {
      return await Game.findById(id).populate('region');
    }
  }
}

export default GameResolvers;