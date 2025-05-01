import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

export const User = mongoose.model('User', userSchema);