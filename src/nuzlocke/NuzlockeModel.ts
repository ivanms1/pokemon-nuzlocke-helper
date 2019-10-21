import { Schema, model, Document } from 'mongoose';

export interface INuzlocke extends Document
{
  type: string;
  game: number;
  name: string;
  encounters: {
    location: string;
    pokemon: number;
    isCaptured: boolean;
  }[];
  team: {
    pokemon: number;
    nickname: string;
    status: string;
    level: number;
    moves: number[];
  }[],
  score: number;
  deaths: number;
}

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
  encounters: [{
    location: {
      type: String,
      required: true
    },
    pokemon: {
      type: Number,
      ref: 'pokemon'
    },
    isCaptured: {
      type: Boolean,
      required: true
    }

  }],
  team: [{
    pokemon: {
      type: Number,
      required: true,
      ref: 'pokemon'
    },
    nickname: {
      type: String
    },
    status: {
      type: String,
      enum: ['ALIVE', 'DEAD', 'RELEASED', 'IN_PC'],
      required: true
    },
    level: {
      type: Number,
      default: 1
    },
    moves: [{
      type: Number,
      ref: 'move'
    }]
  }],
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