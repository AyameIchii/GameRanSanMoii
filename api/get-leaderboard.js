// pages/api/get-leaderboard.js
import scores from '../../data/scores.js';

export default function handler(req, res) {
  res.status(200).json(scores);
}
