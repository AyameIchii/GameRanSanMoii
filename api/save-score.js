export default async function handler(req, res) {
  if (!global.scores) global.scores = [];

  if (req.method === 'POST') {
    const { name, score } = req.body;
    if (!name || typeof score !== 'number') {
      return res.status(400).json({ error: 'Dữ liệu không hợp lệ' });
    }

    global.scores.push({ name, score });
    global.scores = global.scores.sort((a, b) => b.score - a.score).slice(0, 10);

    return res.status(200).json({ message: 'Đã lưu điểm' });
  }

  res.status(405).end();
}
