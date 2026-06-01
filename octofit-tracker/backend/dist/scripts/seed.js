import mongoose from 'mongoose';
import { TeamModel, UserModel, ActivityModel, LeaderboardModel, WorkoutModel } from '../models/index.js';
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
async function main() {
    console.log('Seed the octofit_db database with test data');
    await mongoose.connect(MONGO_URI);
    await Promise.all([
        TeamModel.deleteMany({}),
        UserModel.deleteMany({}),
        ActivityModel.deleteMany({}),
        LeaderboardModel.deleteMany({}),
        WorkoutModel.deleteMany({}),
    ]);
    const teams = await TeamModel.create([
        { name: 'Ocean Sprinters', description: 'High-intensity coastal training team.', coach: 'Marta Silva' },
        { name: 'Urban Pace', description: 'City runners focused on interval training.', coach: 'Carlos Rocha' },
    ]);
    const users = await UserModel.create([
        { name: 'Ana Costa', email: 'ana.costa@example.com', role: 'athlete', team: teams[0]._id },
        { name: 'Paulo Mendes', email: 'paulo.mendes@example.com', role: 'athlete', team: teams[0]._id },
        { name: 'Beatriz Melo', email: 'beatriz.melo@example.com', role: 'captain', team: teams[1]._id },
    ]);
    await ActivityModel.create([
        { user: users[0]._id, type: 'Run', durationMinutes: 38, caloriesBurned: 420, date: new Date('2026-05-18T07:30:00Z') },
        { user: users[1]._id, type: 'Cycling', durationMinutes: 52, caloriesBurned: 570, date: new Date('2026-05-18T09:00:00Z') },
        { user: users[2]._id, type: 'HIIT', durationMinutes: 28, caloriesBurned: 330, date: new Date('2026-05-18T18:45:00Z') },
    ]);
    await WorkoutModel.create([
        { user: users[0]._id, title: 'Morning Endurance', durationMinutes: 45, exercises: ['Warm-up', '5km tempo run', 'Cooldown stretch'], date: new Date('2026-05-18T07:30:00Z') },
        { user: users[1]._id, title: 'City Circuit', durationMinutes: 55, exercises: ['Intervals', 'Hill sprints', 'Core mobility'], date: new Date('2026-05-18T09:00:00Z') },
        { user: users[2]._id, title: 'Strength Burst', durationMinutes: 35, exercises: ['Dynamic warm-up', 'Resistance sets', 'Recovery walk'], date: new Date('2026-05-18T18:45:00Z') },
    ]);
    await LeaderboardModel.create([
        { user: users[0]._id, rank: 1, score: 1380, totalWorkouts: 18 },
        { user: users[2]._id, rank: 2, score: 1245, totalWorkouts: 16 },
        { user: users[1]._id, rank: 3, score: 1120, totalWorkouts: 14 },
    ]);
    console.log('Seed complete.');
    await mongoose.disconnect();
}
main().catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
});
