import { Router } from 'express';
import WorkoutModel from '../models/workout.js';
const router = Router();
router.get('/', async (_req, res) => {
    const workouts = await WorkoutModel.find().populate('user').lean();
    res.json({ workouts });
});
router.post('/', async (req, res) => {
    const workout = await WorkoutModel.create(req.body);
    res.status(201).json({ message: 'Workout saved', workout });
});
export default router;
