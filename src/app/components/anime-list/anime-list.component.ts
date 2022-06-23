import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Anime, AnimesService } from 'src/app/services/animes.service';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.css'],
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
export class AnimeListComponent implements OnInit {
  animes: Anime[] = [];
  currentPage: number = 1;
  searchTerm: string = '';

  constructor(private animesService: AnimesService) {}

  ngOnInit(): void {
    this.animesService
      .getAnimes(this.currentPage)
      .subscribe((data: { animes: Anime[]; pageNumber: number }) => {
        this.animes = data.animes;
        this.currentPage = data.pageNumber;
      });
  }

  loadMoreAnimes() {
    this.animesService
      .getAnimes(this.currentPage + 1, this.searchTerm)
      .subscribe((data: { animes: Anime[]; pageNumber: number }) => {
        this.animes.push(...data.animes);
        this.currentPage = data.pageNumber;
      });
  }

  filterAnimes() {
    this.currentPage = 1;
    this.animesService
      .getAnimes(this.currentPage, this.searchTerm)
      .subscribe((data: { animes: Anime[]; pageNumber: number }) => {
        this.animes = data.animes;
        this.currentPage = data.pageNumber;
      });
  }
}
