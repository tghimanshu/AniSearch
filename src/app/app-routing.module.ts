import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimeListComponent } from './components/anime-list/anime-list.component';
import { RecentReleaseComponent } from './components/recent-release/recent-release.component';
import { SingleAnimeComponent } from './components/single-anime/single-anime.component';

const routes: Routes = [
  {
    path: '',
    component: RecentReleaseComponent,
  },
  {
    path: 'anime',
    component: AnimeListComponent,
  },
  {
    path: 'anime/:id',
    component: SingleAnimeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
