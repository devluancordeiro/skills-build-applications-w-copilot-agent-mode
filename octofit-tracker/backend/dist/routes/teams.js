import { Router } from 'express';
import TeamModel from '../models/team.js';
const router = Router();
router.get('/', async (_req, res) => {
    const teams = await TeamModel.find().lean();
    res.json({ teams });
});
router.post('/', async (req, res) => {
    const team = await TeamModel.create(req.body);
    res.status(201).json({ message: 'Team created', team });
});
export default router;
