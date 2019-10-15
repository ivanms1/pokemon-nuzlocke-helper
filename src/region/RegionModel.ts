import { Schema, model, Document } from 'mongoose';

export interface IRegion extends Document {
  _id: number;
  name: string;
  location: string[];
}

const RegionSchema: Schema = new Schema({
  _id: Number,
  name:{
    type: String,
    required: true
  },
  locations: [{
    type: String,
    required: true
  }]
}, { _id: false});

const Region = model<IRegion>('region', RegionSchema);

export default Region;