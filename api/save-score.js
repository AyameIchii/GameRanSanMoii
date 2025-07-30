// pages/api/save-score.js
import { addScore } from '../../data/scores';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, score } = req.body;
  if (!name || typeof score !== 'number') {
    return res.status(400).json({ error: 'Dữ liệu không hợp lệ' });
  }

  addScore(name, score);
  return res.status(200).json({ success: true });
}
