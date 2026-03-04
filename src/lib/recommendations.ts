import type { Play, Genre } from '../types';

export function getRecommendations(
  plays: Play[],
  seenPlayIds: string[],
  quizAnswers: string[]
): Play[] {
  const seenPlays = plays.filter((p) => quizAnswers.includes(p.id) || seenPlayIds.includes(p.id));
  const preferredGenres = new Map<Genre, number>();

  for (const play of seenPlays) {
    const count = preferredGenres.get(play.genre) || 0;
    preferredGenres.set(play.genre, count + 1);
  }

  const unseenPlays = plays.filter(
    (p) => !seenPlayIds.includes(p.id) && !quizAnswers.includes(p.id)
  );

  const scored = unseenPlays.map((play) => {
    let score = play.rating;
    const genreBoost = preferredGenres.get(play.genre) || 0;
    score += genreBoost * 2;
    if (play.isFeatured) score += 0.5;
    return { play, score };
  });

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, 6).map((s) => s.play);
}
