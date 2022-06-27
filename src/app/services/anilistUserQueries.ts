export const userQuery = `
query {
  Viewer {
    id
    name
    avatar {large medium}
    about
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
