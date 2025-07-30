// pages/api/get-leaderboard.js
import scoreStore from '../../data/scores.js';

export default function handler(req, res) {
  res.status(200).json(scoreStore.scores || []);
}
