import mongoose from 'mongoose';

export interface WorkoutDocument extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  title: string;
  durationMinutes: number;
  exercises: string[];
  date: Date;
}

const workoutSchema = new mongoose.Schema<WorkoutDocument>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  exercises: { type: [String], required: true },
  date: { type: Date, required: true },
});

const WorkoutModel = mongoose.model<WorkoutDocument>('Workout', workoutSchema);
export default WorkoutModel;
