import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { LatestRelease } from 'src/app/models/lists.model';

@Component({
  selector: 'app-episode-card',
  templateUrl: './episode-card.component.html',
  styleUrls: ['./episode-card.component.css'],
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
export class EpisodeCardComponent implements OnInit {
  @Input() anime!: LatestRelease;
  streamUri: string = '';

  constructor() {}

  ngOnInit(): void {}
}
