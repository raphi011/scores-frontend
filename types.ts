export enum EntityName {
  Player = 'player',
  Tournament = 'tournament',
  User = 'user',
}

export const SETTING_TOURNAMENT_FILTER_LEAGUE_KEY = 'tournament-filter-league';
export const SETTING_TOURNAMENT_FILTER_GENDER_KEY = 'tournament-filter-gender';
export const SETTING_TOURNAMENT_FILTER_SEASON_KEY = 'tournament-filter-season';

export interface User {
  id: number;
  email: string;
  role: string;
  profileImageUrl?: string;
  playerId: number;
  playerLogin: string;
  settings: {
    [SETTING_TOURNAMENT_FILTER_LEAGUE_KEY]: string[];
    [SETTING_TOURNAMENT_FILTER_GENDER_KEY]: string[];
    [SETTING_TOURNAMENT_FILTER_SEASON_KEY]: string;
  };
}

export interface Player {
  id: number;

  createdAt: string;
  updatedAt: string;

  birthday?: string;
  club: string;
  countryUnion: string;
  firstName: string;
  gender: string;
  ladderRank: string;
  lastName: string;
  license: string;
  totalPoints: string;
}

export interface Team {
  tournamentId: number;
  player1: Player;
  player2: Player;

  createdAt: string;
  updatedAt: string;

  deregistered: boolean;
  prizeMoney: number;
  result: number;
  seed: number;
  totalPoints: number;
  wonPoints: number;
}

export enum TournamentStatus {
  Upcoming = 'upcoming',
  Done = 'done',
  Canceled = 'canceled',
}

export interface Tournament {
  id: number;

  createdAt: string;
  updatedAt: string;

  currentPoints: string;
  email: string;
  end: string;
  endRegistration?: string;
  entryLink: string;
  gender: string;
  htmlNotes: string;
  latitude: number;
  league: string;
  link: string;
  livescoringLink: string;
  location: string;
  longitude: number;
  maxPoints: number;
  maxTeams: number;
  minTeams: number;
  mode: string;
  name: string;
  organiser: string;
  phone: string;
  registrationOpen: boolean;
  signedupTeams: number;
  start: string;
  status: TournamentStatus;
  subLeague: string;
  teams: Team[];
  website: string;
}

export interface ScrapeJob {
  maxRuns: number;
  name: string;
  maxFailures: number;
  interval: string;

  execution: {
    lastRun: string;
    lastDuration: string;
    runs: number;
    state: number;
    // errors:
  };
}

export type EntityType = User | Player | Team | Tournament;

export interface Classes {
  [key: string]: string;
}
