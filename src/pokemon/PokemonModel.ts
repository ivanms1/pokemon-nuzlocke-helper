import { Schema, model, Document } from 'mongoose';

export interface IPokemon extends Document
{
  _id: number,
  name: string;
  type: [string];
  image: string;
  sprite: string;
  baseStats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  }
}

const PokemonSchema: Schema = new Schema({
  _id: Number,
  name: {
    type: String,
    required: true
  },
  type: [{
    type: String,
    required: true
  }],
  image: {
    type: String,
    required: true
  },
  sprite: {
    type: String,
    required: true
  },
  baseStats: {
    hp: {
      type: Number,
      required: true
    },
    attack: {
      type: Number,
      required: true
    },
    defense: {
      type: Number,
      required: true
    },
    specialAttack: {
      type: Number,
      required: true
    },
    specialDefense: {
      type: Number,
      required: true
    },
    speed: {
      type: Number,
      required: true
    }
  }
}, { _id: false });

const Pokemon = model<IPokemon>('pokemon', PokemonSchema);

export default Pokemon;