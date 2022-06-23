import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  public token = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http.post<{
      localId: string;
      email: string;
      displayName: string;
      idToken: string;
      registered: boolean;
      refreshToken: string;
      expiresIn: string;
    }>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbT1sAxgdsmwnlqHXyljJ_0q9DvShIDTg',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }
  login(email: string, password: string) {
    return this.http.post<{
      idToken: string;
      email: string;
      refreshToken: string;
      expiresIn: string;
      localId: string;
    }>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAbT1sAxgdsmwnlqHXyljJ_0q9DvShIDTg',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }
}
