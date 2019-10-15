import mongoose from 'mongoose';

import Game from '../GameModel';
import { games } from './games';

require('dotenv').config();

const uri = process.env.DATABASE_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  .catch(err => console.log(err));

mongoose.set('useFindAndModify', false);

games.map(game => {
  return new Game({
    _id: game._id,
    name: game.name,
    generation: game.generation,
    region: game.region
  }).save()
})
