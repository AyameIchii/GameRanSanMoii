import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const file = join(process.cwd(), 'leaderboard.json');

export default function handler(req, res) {
  if (!existsSync(file)) return res.json([]);
  const data = JSON.parse(readFileSync(file, 'utf8'));
  return res.status(200).json(data);
}
