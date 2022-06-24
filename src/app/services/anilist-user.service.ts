import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { userQuery } from './anilistUserQueries';

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
          Viewer: {
            id: number;
            about: String;
            name: String;
            avatar: { large: String; medium: string };
          };
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
}
