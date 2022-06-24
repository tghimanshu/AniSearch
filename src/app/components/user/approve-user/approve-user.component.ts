import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnilistUserService } from 'src/app/services/anilist-user.service';

@Component({
  selector: 'app-approve-user',
  templateUrl: './approve-user.component.html',
  styleUrls: ['./approve-user.component.css'],
})
export class ApproveUserComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private aniListUserService: AnilistUserService
  ) {}

  ngOnInit(): void {
    const fragment = this.route.snapshot.fragment?.split('&') as string[];
    localStorage.setItem('anilist_token', fragment[0].split('=')[1]);
    this.aniListUserService.anilistToken.next(fragment[0].split('=')[1]);
    this.aniListUserService.getCurrentUser().subscribe((data) => {
      localStorage.setItem('anilist_user', JSON.stringify(data));
    });

    this.router.navigate(['/']);
  }
}
