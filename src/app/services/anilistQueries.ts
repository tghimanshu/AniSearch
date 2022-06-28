export const allAnimesQuery = (pageNo: number, search?: string) => {
  return `
    query ($pageNo: Int) {
        Page (page: $pageNo, perPage: 25) {
          pageInfo {
            currentPage,
            hasNextPage
          }
          media (${
            search && search !== '' ? `search: "${search}",` : ''
          } type: ANIME) {
            id,
            format,
            season,
            seasonYear,
            genres,
            episodes,
            coverImage {
              large
            }
            title {
              romaji
              english
              native
            }
          }
        }
      }
    `;
};
export const allGenresQuery = (pageNo: number, genre?: string) => {
  return `
    query ($pageNo: Int) {
        Page (page: $pageNo, perPage: 25) {
          pageInfo {
            currentPage,
            hasNextPage
          }
          media (${
            genre && genre !== '' ? `genre: "${genre}",` : ''
          } type: ANIME) {
            id,
            format,
            season,
            seasonYear,
            genres,
            episodes,
            coverImage {
              large
            }
            title {
              romaji
              english
              native
            }
          }
        }
      }
    `;
};

export const singleAnimeQuery = (id: number) => {
  return `
    query ($id: Int) {
          Media (id: $id) {
            id,
            format,
            episodes,
            coverImage {
              large
            }
            bannerImage
            title {
              romaji
              english
              native
            }
            description
            startDate { day month year }
            endDate { day month year }
            season
            seasonYear
            duration
            genres
            averageScore
            meanScore
            popularity
            trending
            favourites
            tags { name }
        }
      }
    `;
};
