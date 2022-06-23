import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimeListComponent } from './components/anime-list/anime-list.component';
import { LoginComponent } from './components/login/login.component';
import { RecentReleaseComponent } from './components/recent-release/recent-release.component';
import { SignupComponent } from './components/signup/signup.component';
import { SingleAnimeComponent } from './components/single-anime/single-anime.component';
import { WatchEpisodeComponent } from './components/watch-episode/watch-episode.component';

const routes: Routes = [
  {
    path: '',
    component: RecentReleaseComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'anime',
    component: AnimeListComponent,
  },
  {
    path: 'anime/:id',
    component: SingleAnimeComponent,
  },
  {
    path: ':anime/:id',
    component: WatchEpisodeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
