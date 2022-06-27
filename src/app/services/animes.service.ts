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
    let subOrDub = 1;
    switch (type) {
      case 'sub':
        subOrDub = 1;
        break;
      case 'dub':
        subOrDub = 2;
        break;
      case 'cn':
        subOrDub = 3;
        break;
      default:
        break;
    }
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
      >(
        'https://anisearch-api.herokuapp.com/search?keyw=' +
          animeTitle.replace(/[^a-zA-Z0-9]/g, '+')
        // replaces all special characters and spaces with '+' sign
      )
      .pipe(
        take(1),
        exhaustMap((data) => {
          return this.http
            .get<AnimeDetails>(
              'https://anisearch-api.herokuapp.com/anime-details/' +
                data[0].animeId
            )
            .pipe(
              map((data) => {
                data.episodesList.reverse();
                return data;
              })
            );
        })
      );
  }
  getAnimeFromTitle(animeTitle: string) {
    animeTitle = animeTitle.includes('(Dub)')
      ? animeTitle.split('(Dub)')[0]
      : animeTitle;
    return this.getAnimes(1, animeTitle).pipe(
      map((data: { animes: Anime[]; pageNumber: number }) => {
        return data.animes[0];
      })
    );
  }
}
