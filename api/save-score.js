// pages/api/save-score.js
import scoreStore from '../../data/scores.js';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, score } = req.body;
  if (!name || typeof score !== 'number') {
    return res.status(400).json({ error: 'Dữ liệu không hợp lệ' });
  }

  scoreStore.scores.push({ name, score });
  scoreStore.scores.sort((a, b) => b.score - a.score);
  if (scoreStore.scores.length > 10) scoreStore.scores.length = 10;

  return res.status(200).json({ success: true });
}
