import { Component, OnInit } from '@angular/core';
import { AnilistUser } from 'src/app/models/anilistUser.model';
import { AnilistUserService } from 'src/app/services/anilist-user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user!: AnilistUser;
  constructor(private anilistUserService: AnilistUserService) {}

  ngOnInit(): void {
    this.anilistUserService.getCurrentUser().subscribe((data) => {
      this.user = data;
      console.log(this.user.statistics.anime.statuses);
    });
  }
}
