import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Anime, AnimesService } from 'src/app/services/animes.service';

@Component({
  selector: 'app-single-anime',
  templateUrl: './single-anime.component.html',
  styleUrls: ['./single-anime.component.css'],
})
export class SingleAnimeComponent implements OnInit {
  anime!: Anime;

  constructor(
    private route: ActivatedRoute,
    private animesService: AnimesService
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.animesService.getSingleAnimes(id).subscribe((value: Anime) => {
      console.log(value);
      this.anime = value;
    });
  }
}
