// pages/api/get-leaderboard.js
export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const DETA_BASE_URL = process.env.DETA_BASE_URL;
  const DETA_API_KEY = process.env.DETA_API_KEY;

  const result = await fetch(`${DETA_BASE_URL}/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': DETA_API_KEY
    },
    body: JSON.stringify({
      "query": [],
      "limit": 10
    })
  });

  if (!result.ok) {
    return res.status(500).json({ error: 'Không thể lấy danh sách' });
  }

  const data = await result.json();
  const topScores = data.items
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map(({ name, score }) => ({ name, score }));

  res.status(200).json(topScores);
}
