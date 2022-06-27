export interface Anime {
  id: number;
  format: string;
  episodes: number;
  coverImage: {
    large: string;
  };
  bannerImage: string;
  title: {
    romaji: string;
    english: string;
    native: string;
  };
  description?: string;
  startDate: { day: number; month: number; year: number };
  endDate: { day: number; month: number; year: number };
  season: string;
  seasonYear: number;
  duration?: number;
  genres: string;
  averageScore?: number;
  meanScore?: number;
  popularity?: number;
  trending?: string;
  tags?: { name: string }[];
  favourites?: number;
}
export interface LatestRelease {
  episodeId: string;
  animeTitle: string;
  episodeNum: string;
  subOrDub: string;
  animeImg: string;
  episodeUrl: string;
}

export interface AnimeDetails {
  animeTitle: string;
  type: string;
  releasedDate: string;
  status: string;
  genres: string[];
  otherNames: string;
  synopsis: string;
  animeImg: string;
  totalEpisodes: string;
  episodesList: EpisodesList[];
}

export interface EpisodesList {
  episodeId: string;
  episodeNum: string;
  episodeUrl: string;
}
