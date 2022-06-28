import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AnimeDetails } from 'src/app/models/models';
import { AnilistUserService } from 'src/app/services/anilist-user.service';
import { AnimesService } from 'src/app/services/animes.service';
import { Anime } from 'src/app/models/models';

@Component({
  selector: 'app-watch-episode',
  templateUrl: './watch-episode.component.html',
  styleUrls: ['./watch-episode.component.css'],
})
export class WatchEpisodeComponent implements OnInit {
  streamUrl!: string;
  episodeId!: string;
  animeTitle!: string;
  animeDetails!: AnimeDetails;
  anime!: Anime;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private animesService: AnimesService,
    private anilistUserService: AnilistUserService
  ) {
    window.addEventListener('message', function (event) {
      console.log('first', event);
    });
  }
  ngOnInit(): void {
    // Get Episode
    this.episodeId = this.route.snapshot.params['id'];
    this.animeTitle = decodeURIComponent(this.route.snapshot.params['anime']);
    this.route.params.subscribe((params: Params) => {
      this.episodeId = params['id'];
      this.animeTitle = decodeURIComponent(params['anime']);
      this.animesService.getEpisode(this.episodeId, this.animeTitle).subscribe({
        next: (data) => {
          this.streamUrl = data;
        },
        complete: () => {
          // Get Anilist Anime
          this.animesService
            .getAnimeFromTitle(this.animeTitle)
            .subscribe((data) => {
              this.anime = data;
            });
        },
      });
    });
    this.animesService
      .getAnimeDetailsFromTitle(this.animeTitle)
      .subscribe((data) => (this.animeDetails = data));
  }

  previousEpisode() {
    try {
      let prevEpNum: number =
        +this.episodeId.split('-')[this.episodeId.split('-').length - 1] - 2;
      this.anilistUserService.updateProgress(this.anime, prevEpNum);
      this.router.navigate([
        encodeURIComponent(this.animeDetails.animeTitle),
        this.animeDetails.episodesList[prevEpNum].episodeId,
      ]);
    } catch (error) {
      this.router.navigate(['/anime', this.anime.id]);
    }
  }

  nextEpisode() {
    try {
      let nextEpNum: number =
        +this.episodeId.split('-')[this.episodeId.split('-').length - 1];
      this.anilistUserService.updateProgress(this.anime, nextEpNum);

      this.router.navigate([
        encodeURIComponent(this.animeDetails.animeTitle),
        this.animeDetails.episodesList[nextEpNum].episodeId,
      ]);
    } catch (error) {
      this.router.navigate(['/anime', this.anime.id]);
    }
  }
}
