import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// Interface defining User document structure and methods
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  lastLogin: Date;
  // Method to compare password with hashed password
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// MongoDB Schema definition for User
const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lastLogin: { type: Date, default: Date.now }
});

// middleware to hash password
// Only runs if password field has been modified
UserSchema.pre<IUser>('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  // Generate salt and hash passwordg
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Instance method to compare password with hash
// Returns true if passwords match, false otherwise
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);


//??What is salting?

// If two users have password "Password123"
// Both would have same hash: "a7b3c9d..." 
// Vulnerable to rainbow table attacks

