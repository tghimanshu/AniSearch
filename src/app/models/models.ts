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
