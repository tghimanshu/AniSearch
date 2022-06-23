import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AnimeDetails } from 'src/app/models/models';
import { AnimesService } from 'src/app/services/animes.service';

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

  constructor(
    private route: ActivatedRoute,
    private animesService: AnimesService
  ) {}

  ngOnInit(): void {
    this.episodeId = this.route.snapshot.params['id'];
    this.animeTitle = decodeURIComponent(this.route.snapshot.params['anime']);
    this.route.params.subscribe((params: Params) => {
      this.episodeId = params['id'];
      this.animeTitle = decodeURIComponent(params['anime']);
      this.animesService.getEpisode(this.episodeId, this.animeTitle).subscribe({
        next: (data) => {
          // this.streamUrl = data.episodeUri;
          this.streamUrl = data;
        },
        complete: () => console.log('completed'),
      });
    });
    this.animesService
      .getEpisode(this.episodeId, this.animeTitle)
      .subscribe((data) => {
        // this.streamUrl = data.episodeUri;
        this.streamUrl = data;
      });
    this.animesService
      .getAnimeDetailsFromTitle(this.animeTitle)
      .subscribe((data) => (this.animeDetails = data));
  }
}
