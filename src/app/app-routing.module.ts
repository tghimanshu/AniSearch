import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimeListComponent } from './components/anime-list/anime-list.component';
import { LoginComponent } from './components/login/login.component';
import { RecentReleaseComponent } from './components/recent-release/recent-release.component';
import { SignupComponent } from './components/signup/signup.component';
import { SingleAnimeComponent } from './components/single-anime/single-anime.component';
import { ApproveUserComponent } from './components/user/approve-user/approve-user.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { WatchEpisodeComponent } from './components/watch-episode/watch-episode.component';
import { AuthGuardGuard } from './guard/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardGuard],
    component: RecentReleaseComponent,
  },
  {
    path: 'approveAnilist',
    component: ApproveUserComponent,
  },
  {
    path: 'anime',
    canActivate: [AuthGuardGuard],
    component: AnimeListComponent,
  },
  {
    path: 'anime/:id',
    canActivate: [AuthGuardGuard],
    component: SingleAnimeComponent,
  },
  {
    path: ':anime/:id',
    canActivate: [AuthGuardGuard],
    component: WatchEpisodeComponent,
  },
  {
    path: 'profile',
    canActivate: [AuthGuardGuard],
    component: UserProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
