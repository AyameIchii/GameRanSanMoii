// pages/api/save-score.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, score } = req.body;
  if (!name || typeof score !== 'number') {
    return res.status(400).json({ error: 'Dữ liệu không hợp lệ' });
  }

  const DETA_BASE_URL = process.env.DETA_BASE_URL;
  const DETA_API_KEY = process.env.DETA_API_KEY;

  const result = await fetch(`${DETA_BASE_URL}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': DETA_API_KEY
    },
    body: JSON.stringify({
      name,
      score,
      createdAt: Date.now()
    })
  });

  if (!result.ok) {
    return res.status(500).json({ error: 'Không thể lưu điểm' });
  }

  res.status(200).json({ success: true });
}
