import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeDetails } from 'src/app/models/models';
import { AnilistUserService } from 'src/app/services/anilist-user.service';
import { Anime, AnimesService } from 'src/app/services/animes.service';

@Component({
  selector: 'app-single-anime',
  templateUrl: './single-anime.component.html',
  styleUrls: ['./single-anime.component.css'],
})
export class SingleAnimeComponent implements OnInit {
  anime!: Anime;
  animeDetails!: AnimeDetails;
  animeStatus!: String;
  animeProgress!: number;

  constructor(
    private route: ActivatedRoute,
    private animesService: AnimesService,
    private anilistUserService: AnilistUserService
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.animesService.getSingleAnimes(id).subscribe((value: Anime) => {
      this.anime = value;
      this.anilistUserService
        .getUserAnimeStatus(
          +id,
          +JSON.parse(localStorage.getItem('anilist_user') as string)['id']
        )
        .subscribe({
          next: (data) => {
            this.animeStatus = data.data.MediaList.status;
            this.animeProgress = data.data.MediaList.progress;
          },
          error: (err: HttpErrorResponse) => {
            this.animesService
              .getAnimeDetailsFromTitle(this.anime.title.romaji)
              .subscribe({
                next: (data) => {
                  this.animeDetails = data;
                },
              });
          },
          complete: () => {
            this.animesService
              .getAnimeDetailsFromTitle(this.anime.title.romaji)
              .subscribe({
                next: (data) => {
                  this.animeDetails = data;
                },
              });
          },
        });
    });
  }

  updateStatus(status: string) {
    this.anilistUserService.updateStatus(this.anime, status);
    this.animeStatus = status;
    this.animeProgress =
      status === 'COMPLETED' ? this.anime.episodes : this.animeProgress;
  }
}
