import mongoose from 'mongoose';

export interface TeamDocument extends mongoose.Document {
  name: string;
  description: string;
  coach: string;
}

const teamSchema = new mongoose.Schema<TeamDocument>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  coach: { type: String, required: true },
});

const TeamModel = mongoose.model<TeamDocument>('Team', teamSchema);
export default TeamModel;
