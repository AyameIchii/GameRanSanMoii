// pages/api/get-leaderboard.js
import { getScores } from '../../data/scores';

export default function handler(req, res) {
  res.status(200).json(getScores());
}
