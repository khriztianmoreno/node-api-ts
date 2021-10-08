import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserDocument extends mongoose.Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  role: 'user' | 'admin' | 'manager';
}

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    match: /.+\@.+\..+/,
    required: [true, 'El email es requerido'],
    validate: {
      validator: async function (value: string) {
        const user = await User.findOne({
          email: value
        });
        return user === null;
      },
      message: 'Email duplicado',
    },
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    uppercase: true,
    required: true
  },
  lastName: {
    type: String
  },
  role: { type: String, default: 'user' },
}, {
  timestamps: true
});

UserSchema.pre('save', async function (next: mongoose.HookNextFunction) {
  const user = this as UserDocument;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  try {
    const hash = await bcrypt.hash(user.password, 10);
    // Replace the password with the hash
    user.password = hash;
    return next();
  } catch (err: any) {
    return next(err);
  }
});

const User = mongoose.model<UserDocument>('User', UserSchema);

export default User;
