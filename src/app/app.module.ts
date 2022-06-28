import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { HeaderComponent } from './components/header/header.component';
import { AnimeListComponent } from './components/anime-list/anime-list.component';
import { SingleAnimeComponent } from './components/single-anime/single-anime.component';
import { RecentReleaseComponent } from './components/recent-release/recent-release.component';
import { ParseHTMLPipe, SafePipe, UrlEncodePipe } from './pipes';
import { EpisodeCardComponent } from './components/recent-release/episode-card/episode-card.component';
import { AnimeCardComponent } from './components/anime-list/anime-card/anime-card.component';
import { AnimeCardHoverComponent } from './directives/anime-card-hover/anime-card-hover.component';
import { AnimeCardHoverDirective } from './directives/anime-card-hover.directive';
import { ReferrerInterceptor } from './services/referrer.interceptor';
import { WatchEpisodeComponent } from './components/watch-episode/watch-episode.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ApproveUserComponent } from './components/user/approve-user/approve-user.component';
import { AnilistInterceptorInterceptor } from './services/anilist-interceptor.interceptor';
import { GlobalErrorHandler } from './globalErrorHandler';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { GenresComponent } from './components/genres/genres.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AnimeListComponent,
    EpisodeCardComponent,
    SingleAnimeComponent,
    RecentReleaseComponent,
    SafePipe,
    AnimeCardComponent,
    AnimeCardHoverComponent,
    AnimeCardHoverDirective,
    WatchEpisodeComponent,
    UrlEncodePipe,
    ParseHTMLPipe,
    LoginComponent,
    SignupComponent,
    ApproveUserComponent,
    UserProfileComponent,
    GenresComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatCardModule,
    MatChipsModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatTooltipModule,
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AnilistInterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
