import { Schema, model, Document } from 'mongoose';

export interface IGame extends Document {
  name: string;
  generation: string;
  region: number;
}

const GameSchema: Schema = new Schema({
  _id: Number,
  name: {
    type: String,
    required: true
  },
  generation: {
    type: String,
    required: true
  },
  region: {
    type: Number,
    ref: 'region'
  }
}, { _id: false});

const Game = model<IGame>('game', GameSchema);

export default Game;