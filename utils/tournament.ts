import { formatDate } from './date';

import { Tournament } from '../types';

export function tournamentDateString(tournament: Tournament) {
  if (tournament.start === tournament.end) {
    return formatDate(tournament.start);
  }

  return `${formatDate(tournament.start)} - ${formatDate(tournament.end)}`;
}

export function isSignedup(tournament: Tournament, userId: number): boolean {
  if (!tournament || !tournament.teams) {
    return false;
  }

  return tournament.teams.some(
    t => t.player1.id === userId || t.player2.id === userId,
  );
}
