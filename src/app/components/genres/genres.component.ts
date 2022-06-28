import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { AnimesService } from 'src/app/services/animes.service';
import { Anime } from 'src/app/models/models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css'],
  animations: [
    trigger('animeList', [
      state(':enter', style({ transform: 'scale(1)' })),
      state(':leave', style({ transform: 'scale(0)' })),
      transition(':enter', [
        style({ transform: 'scale(0)' }),
        animate(500),
        style({ transform: 'scale(1)' }),
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)' }),
        animate(500),
        style({ transform: 'scale(0)' }),
      ]),
    ]),
  ],
})
export class GenresComponent implements OnInit {
  animes: Anime[] = [];
  currentPage: number = 1;
  genreTerm: string = '';

  constructor(
    private animesService: AnimesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.genreTerm = this.route.snapshot.params['genre'];
    this.animesService
      .getGenres(this.currentPage, this.genreTerm)
      .subscribe((data: { animes: Anime[]; pageNumber: number }) => {
        this.animes = data.animes;
        this.currentPage = data.pageNumber;
      });
  }

  loadMoreAnimes() {
    this.animesService
      .getGenres(this.currentPage + 1, this.genreTerm)
      .subscribe((data: { animes: Anime[]; pageNumber: number }) => {
        this.animes.push(...data.animes);
        this.currentPage = data.pageNumber;
      });
  }

  filterAnimes() {
    this.currentPage = 1;
    this.animesService
      .getGenres(this.currentPage, this.genreTerm)
      .subscribe((data: { animes: Anime[]; pageNumber: number }) => {
        this.animes = data.animes;
        this.currentPage = data.pageNumber;
      });
  }
  @HostListener('window:scroll', [])
  onScroll(): void {
    if (
      window.innerHeight + 50 + window.scrollY >=
      document.body.offsetHeight
    ) {
      this.loadMoreAnimes();
    }
  }
}
