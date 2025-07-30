import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

const file = join(process.cwd(), 'leaderboard.json');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, score } = req.body;

  if (!name || typeof score !== 'number') {
    return res.status(400).json({ message: 'Invalid input' });
  }

  let data = [];
  if (existsSync(file)) {
    data = JSON.parse(readFileSync(file, 'utf8'));
  }

  data.push({ name, score });
  data.sort((a, b) => b.score - a.score);
  data = data.slice(0, 10); // Top 10

  writeFileSync(file, JSON.stringify(data, null, 2));
  return res.status(200).json({ message: 'Saved' });
}
