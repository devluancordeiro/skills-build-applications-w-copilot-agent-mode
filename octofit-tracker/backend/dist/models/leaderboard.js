import mongoose from 'mongoose';
const leaderboardSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rank: { type: Number, required: true },
    score: { type: Number, required: true },
    totalWorkouts: { type: Number, required: true },
});
const LeaderboardModel = mongoose.model('Leaderboard', leaderboardSchema);
export default LeaderboardModel;
