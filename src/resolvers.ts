import { merge } from 'lodash';

import GameResolvers from './game/GameResolvers';
import RegionResolvers from './region/RegionResolvers';
import PokemonResolvers from './pokemon/PokemonResolvers';
import NuzlockeResolvers from './nuzlocke/NuzlockeResolvers';
import UserResolvers from './user/UserResolvers';

const resolvers = merge(GameResolvers, RegionResolvers, PokemonResolvers, NuzlockeResolvers, UserResolvers);

export default resolvers;