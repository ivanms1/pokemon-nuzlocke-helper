import GameSchema from './game/GameTypes';
import RegionSchema from './region/RegionTypes';
import PokemonSchema from './pokemon/PokemonTypes';
import NuzlockeSchema from './nuzlocke/NucklockeTypes';
import UserSchema from './user/UserTypes';

const typeDefs = [GameSchema, RegionSchema, PokemonSchema, NuzlockeSchema, UserSchema];

export default typeDefs;