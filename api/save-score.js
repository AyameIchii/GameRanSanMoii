let scores = [];

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { name, score } = req.body;
  if (!name || typeof score !== 'number') return res.status(400).json({ error: 'bad' });
  scores.push({ name, score });
  scores.sort((a, b) => b.score - a.score);
  scores = scores.slice(0, 10);
  return res.status(200).json({ success: true });
}
