import mongoose from 'mongoose';
const teamSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    coach: { type: String, required: true },
});
const TeamModel = mongoose.model('Team', teamSchema);
export default TeamModel;
