import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, default: null },
    firstName: { type: String, required: true },
    lastName: { type: String, default: null, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema, 'Users');
