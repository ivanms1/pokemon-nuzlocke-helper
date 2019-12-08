import { Schema, model, Document } from 'mongoose';

export interface INuzlocke extends Document {
  type: string;
  game: number;
  name: string;
  pokemons: {
    pokemon: number;
    location: string;
    nickname: string;
    status: string;
    level: number;
    moves: number[];
  }[];
  score: number;
  deaths: number;
}

const NuzlockePokemonSchema: Schema = new Schema({
  location: {
    type: String,
    required: true
  },
  pokemon: {
    type: Number,
    ref: 'pokemon'
  },
  partner: {
    type: Number,
    ref: 'pokemon'
  },
  nickname: {
    type: String
  },
  status: {
    type: String,
    enum: ['IN_TEAM', 'IN_PC', 'DEAD', 'SEEN'],
    required: true
  },
  level: {
    type: Number,
    default: 1
  },
  moves: [
    {
      type: Number,
      ref: 'move'
    }
  ]
});

const NuzlockeSchema: Schema = new Schema({
  type: {
    type: String,
    enum: ['NORMAL', 'CAGELOCKE', 'SOUL_LINK'],
    required: true
  },
  game: {
    type: Number,
    ref: 'game'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  name: {
    type: String
  },
  pokemons: [
    {
      type: NuzlockePokemonSchema
    }
  ],
  score: {
    type: Number,
    default: 0
  },
  deaths: {
    type: Number,
    default: 0
  }
});

const Nuzlocke = model<INuzlocke>('nuzlocke', NuzlockeSchema);

export default Nuzlocke;
