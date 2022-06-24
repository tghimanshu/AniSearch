import { Component } from '@angular/core';
import { AnilistInterceptorInterceptor } from './services/anilist-interceptor.interceptor';
import { AnilistUserService } from './services/anilist-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private anilistUserService: AnilistUserService) {}
  ngOnInit() {
    let token = localStorage.getItem('anilist_token') as string;
    this.anilistUserService.anilistToken.next(token);
  }
}
