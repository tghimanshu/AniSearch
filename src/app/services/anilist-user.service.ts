import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { AnilistUser } from '../models/anilistUser.model';
import { Anime } from '../models/models';
import {
  userAnimeProgressUpdateQuery,
  userAnimeStatusQuery,
  userQuery,
} from './anilistUserQueries';

@Injectable({
  providedIn: 'root',
})
export class AnilistUserService {
  public anilistToken = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  getCurrentUser() {
    return this.http
      .post<{
        data: {
          Viewer: AnilistUser;
        };
      }>('https://graphql.anilist.co', {
        query: userQuery,
      })
      .pipe(map((data) => data.data.Viewer));
  }
  getUserAnimeList() {
    return this.http.post('https://graphql.anilist.co', {
      query: '',
    });
  }
  getUserAnimeStatus(animeId: number, userId: number) {
    return this.http.post<{
      data: { MediaList: { status: string; progress: number } };
    }>('https://graphql.anilist.co', {
      query: userAnimeStatusQuery,
      variables: {
        animeId: animeId,
        userId: userId,
      },
    });
  }
  updateProgress(anime: Anime, progress: number) {
    let status = 'CURRENT';
    if (anime.episodes === progress) status = 'COMPLETED';
    return this.http
      .post<{
        data: { SaveMediaListEntry: { status: String; progress: number } };
      }>('https://graphql.anilist.co', {
        query: userAnimeProgressUpdateQuery,
        variables: {
          animeId: anime.id,
          status: status,
          progress: progress,
        },
      })
      .subscribe({
        next: (data) => {
          return;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  updateStatus(anime: Anime, status: string) {
    let progress = 0;
    if (status === 'COMPLETED') progress = anime.episodes;
    return this.http
      .post<{
        data: { SaveMediaListEntry: { status: String; progress: number } };
      }>('https://graphql.anilist.co', {
        query: userAnimeProgressUpdateQuery,
        variables: {
          animeId: anime.id,
          status: status,
          progress: progress,
        },
      })
      .subscribe({
        next: (data) => {
          return;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
