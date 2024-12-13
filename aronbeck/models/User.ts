import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  picture: String,
  lastLogin: Date
}, {
  timestamps: true,
  collection: 'users'
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema); 