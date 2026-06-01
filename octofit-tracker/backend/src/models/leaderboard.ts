import mongoose from 'mongoose';

export interface LeaderboardDocument extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  rank: number;
  score: number;
  totalWorkouts: number;
}

const leaderboardSchema = new mongoose.Schema<LeaderboardDocument>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rank: { type: Number, required: true },
  score: { type: Number, required: true },
  totalWorkouts: { type: Number, required: true },
});

const LeaderboardModel = mongoose.model<LeaderboardDocument>('Leaderboard', leaderboardSchema);
export default LeaderboardModel;
