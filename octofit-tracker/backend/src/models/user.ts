import mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
  role: string;
  team: mongoose.Types.ObjectId;
}

const userSchema = new mongoose.Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
});

const UserModel = mongoose.model<UserDocument>('User', userSchema);
export default UserModel;
