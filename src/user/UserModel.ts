import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  nuzlockes: number[];
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  nuzlockes: [{
    type: Schema.Types.ObjectId,
    ref: 'nuzlocke'
  }]
});

const User = model<IUser>('user', UserSchema);

export default User;