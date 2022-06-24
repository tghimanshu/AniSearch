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
