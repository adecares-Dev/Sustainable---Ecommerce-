import express from 'express';
import {
  getUserImpact,
  getLeaderboard,
  getPlatformStats,
  getRecommendations
} from '../controllers/SustainabilityController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/impact/:userId', auth, getUserImpact);
router.get('/leaderboard', getLeaderboard);
router.get('/stats', getPlatformStats);
router.get('/recommendations', getRecommendations);

export default router;