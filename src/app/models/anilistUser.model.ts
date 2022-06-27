export interface AnilistUser {
  id: number;
  name: string;
  about: null;
  avatar: Avatar;
  bannerImage: string;
  statistics: Statistics;
}

export interface Avatar {
  large: string;
  medium: string;
}

export interface Statistics {
  anime: AnimeStats;
}

export interface AnimeStats {
  count: number;
  meanScore: number;
  standardDeviation: number;
  minutesWatched: number;
  episodesWatched: number;
  formats: Format[];
  statuses: Format[];
}

export interface Format {
  count: number;
  meanScore: number;
  minutesWatched: number;
  mediaIds: number[];
  format?: string;
  status?: string;
}
