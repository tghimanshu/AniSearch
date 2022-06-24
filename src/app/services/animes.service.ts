import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, exhaustMap, take, tap } from 'rxjs';
import { AnimeDetails, LatestRelease } from '../models/models';
import { allAnimesQuery, singleAnimeQuery } from './anilistQueries';

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

@Injectable({
  providedIn: 'root',
})
export class AnimesService {
  public streamUri = new BehaviorSubject<string>('');
  constructor(private http: HttpClient) {}

  getViewer() {
    const query = `
     query {
  Viewer {
    statistics {
      anime  {
        count
        minutesWatched
        episodesWatched

      }
    }
  }
}
    `;

    return this.http
      .post('https://graphql.anilist.co', {
        query: query,
      })
      .pipe(
        tap((value) => {
          console.log(value);
        })
      )
      .subscribe(console.log);
  }

  getAnimes(pageNo: number, search?: string) {
    const query = allAnimesQuery(pageNo, search);

    const variables = {
      pageNo: pageNo,
    };
    return this.http
      .post<{
        data: {
          Page: {
            media: Anime[];
            pageInfo: { hasNextPage: boolean; currentPage: number };
          };
        };
      }>('https://graphql.anilist.co', {
        query: query,
        variables: variables,
      })
      .pipe(
        map((value) => {
          return {
            animes: value.data.Page.media,
            pageNumber: value.data.Page.pageInfo.hasNextPage
              ? value.data.Page.pageInfo.currentPage
              : 0,
          };
        })
      );
  }

  getSingleAnimes(id: number) {
    const query = singleAnimeQuery(id);
    const variables = {
      id: id,
    };

    return this.http
      .post<{
        data: {
          Media: Anime;
        };
      }>('https://graphql.anilist.co', {
        query: query,
        variables: variables,
      })
      .pipe(
        map((value) => {
          return value.data.Media;
        })
      );
  }

  getRecentReleases(type: string, pageNo: number = 1) {
    const subOrDub = type === 'sub' ? 1 : 2;
    return this.http.get<LatestRelease[]>(
      'https://anisearch-api.herokuapp.com/recent-release?page=' +
        pageNo +
        '&type=' +
        subOrDub
    );
  }
  getEpisode(id: string, anime: string) {
    return this.http
      .get<{ Referer: string; sources: object[]; sourcesbk: object[] }>(
        'https://anisearch-api.herokuapp.com/vidcdn/watch/' + id
      )
      .pipe(
        // take(1),
        // exhaustMap((episode) => {
        //   return this.http
        //     .get<object[]>(
        //       'https://gogoanime.herokuapp.com/search?keyw=' + anime
        //     )
        //     .pipe(
        //       map((data) => {
        //         return { episodeUri: episode.Referer, anime: data[0] };
        //       })
        //     );
        // })
        map((data) => {
          return data.Referer;
        })
      );
  }

  getAnimeDetailsFromTitle(animeTitle: string) {
    return this.http
      .get<
        {
          animeId: string;
          animeImg: string;
          animeTitle: string;
          animeUrl: string;
          status: string;
        }[]
      >('https://anisearch-api.herokuapp.com/search?keyw=' + animeTitle)
      .pipe(
        take(1),
        exhaustMap((data) => {
          return this.http.get<AnimeDetails>(
            'https://anisearch-api.herokuapp.com/anime-details/' +
              data[0].animeId
          );
        })
      );
  }
}
