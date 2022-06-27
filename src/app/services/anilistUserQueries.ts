export const userQuery = `
query {
  Viewer {
    id
    name
    about
    avatar {
      large
      medium
    }
    bannerImage
    statistics {
      anime {
        count
        meanScore
        standardDeviation
        minutesWatched
        episodesWatched
        formats {
          count
          meanScore
          minutesWatched
          mediaIds
          format
        }
        statuses {
          count
          meanScore
          minutesWatched
          mediaIds
          status
        }

      }
    }
  }
}
`;

export const userAnimeStatusQuery = `
query ($animeId: Int, $userId: Int) {
  MediaList(mediaId:$animeId, userId:$userId){
    status
    progress
  }
}
`;

export const userAnimeProgressUpdateQuery = `
  mutation SaveMediaListEntry($animeId: Int, $progress: Int, $status: MediaListStatus) {
    SaveMediaListEntry(mediaId: $animeId, progress: $progress, status: $status){status, progress}

  }
`;
