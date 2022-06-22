import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { LatestRelease } from '../models/lists.model';

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
}

@Injectable({
  providedIn: 'root',
})
export class AnimesService {
  public streamUri = new BehaviorSubject<string>('');
  constructor(private http: HttpClient) {}

  getAnimes(pageNo: number, search?: string) {
    const query = `
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
    const query = `
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
            tags { name }
        }
      }
    `;

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
      'https://gogoanime.herokuapp.com/recent-release?page=' +
        pageNo +
        '&type=' +
        subOrDub
    );
  }
}
