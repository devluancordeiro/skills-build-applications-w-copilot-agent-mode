import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';

const app = express();
const PORT = 8000;
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const API_HOST = CODESPACE_NAME
  ? `${CODESPACE_NAME}-8000.githubpreview.dev`
  : `localhost:${PORT}`;
const API_URL = CODESPACE_NAME ? `https://${API_HOST}` : `http://${API_HOST}`;
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'OctoFit Tracker backend',
    apiUrl: API_URL,
    mode: CODESPACE_NAME ? 'codespaces' : 'local',
  });
});

app.get('/api', (_req, res) => {
  res.json({
    api: 'OctoFit Tracker',
    routes: [
      '/api/users',
      '/api/teams',
      '/api/activities',
      '/api/leaderboard',
      '/api/workouts',
    ],
    apiUrl: API_URL,
  });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB:', MONGO_URI);
    console.log('API URL:', API_URL);
    app.listen(PORT, () => {
      console.log(`Backend listening on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  });
