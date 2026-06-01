import mongoose from 'mongoose';
const workoutSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    exercises: { type: [String], required: true },
    date: { type: Date, required: true },
});
const WorkoutModel = mongoose.model('Workout', workoutSchema);
export default WorkoutModel;
