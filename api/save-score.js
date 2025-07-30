// pages/api/save-score.js
import scores from '../../data/scores.js';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, score } = req.body;
  if (!name || typeof score !== 'number') {
    return res.status(400).json({ error: 'Dữ liệu không hợp lệ' });
  }

  scores.push({ name, score });
  scores.sort((a, b) => b.score - a.score);
  if (scores.length > 10) scores.length = 10;

  return res.status(200).json({ success: true });
}
