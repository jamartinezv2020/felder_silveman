import mongoose, { Document, Schema } from 'mongoose';

export interface UserDocument extends Document {
  googleId: string;
  email: string;
  name: string;
  password: string;
}

const userSchema = new Schema<UserDocument>({
  googleId: {
    type: String,
    required: false, // No requerido para usuarios normales
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false, // No requerido para usuarios de Google OAuth
  },
});

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;




