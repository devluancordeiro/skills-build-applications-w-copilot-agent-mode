import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ workouts: [] });
});

router.post('/', (req, res) => {
  res.status(201).json({ message: 'Workout saved', workout: req.body });
});

export default router;
