import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AnilistUserService } from 'src/app/services/anilist-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  searchTerm: string = '';
  token: string | undefined | null;
  anilistToken: string | undefined | null;
  name!: string;
  subscription!: Subscription;

  constructor(
    private router: Router,
    private anilistUserService: AnilistUserService
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('anilist_token');
    this.name = JSON.parse(localStorage.getItem('anilist_user') as string)[
      'name'
    ];
    this.subscription = this.anilistUserService.anilistToken.subscribe(
      (value) => {
        this.anilistToken = value;
      }
    );
  }

  logout() {
    console.log('logging out');
    localStorage.removeItem('anilist_token');
    this.anilistUserService.anilistToken.next('');
    this.router.navigate(['/']);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
