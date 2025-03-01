import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

// Define an interface for the User model
export interface IUser extends Document {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'designer' | 'client' | 'admin';
  verificationToken?: string;
  verificationTokenExpiry?: Date;
  isVerified: boolean;
  isBlocked: boolean; 
  status: 'active' | 'inactive';  // ✅ Add status field
}
const userSchema: Schema<IUser> = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['designer', 'client', 'admin'],
    },
    verificationToken: {
      type: String,
      default: '',
    },
    verificationTokenExpiry: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'], // ✅ Define valid status values
      default: 'active', // ✅ Default status
    },
  },
  {
    timestamps: true, // Auto-create `createdAt` and `updatedAt`
  }
);


// Hash password before saving
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Create and export the User model
export const User = mongoose.model<IUser>('User', userSchema);
export default User;
