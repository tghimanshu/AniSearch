import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Anime } from 'src/app/models/models';

@Component({
  selector: 'app-anime-card',
  templateUrl: './anime-card.component.html',
  styleUrls: ['./anime-card.component.css'],
  animations: [
    trigger('showAnimeCard', [
      state(':enter', style({ transform: 'scale(0)' })),
      state(':leave', style({ transform: 'scale(1)' })),
      transition(':enter', [
        style({ transformOrigin: '0 0 0', transform: 'scale(0)' }),
        animate(500),
        style({ transformOrigin: '0 0 0', transform: 'scale(1)' }),
      ]),
      transition(':leave', [
        style({ transformOrigin: '0 0 0', transform: 'scale(1)' }),
        animate(500),
        style({ transformOrigin: '0 0 0', transform: 'scale(0)' }),
      ]),
    ]),
  ],
})
export class AnimeCardComponent implements OnInit {
  @Input() anime!: Anime;

  constructor() {}

  ngOnInit(): void {}
}
