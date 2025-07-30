// data/scores.js
let scores = [];

export function getScores() {
  return scores;
}

export function addScore(name, score) {
  scores.push({ name, score });
  scores.sort((a, b) => b.score - a.score);
  if (scores.length > 10) scores = scores.slice(0, 10);
}
