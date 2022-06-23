import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  searchTerm: string = '';
  token: string | undefined | null;
  subscription!: Subscription;

  constructor(
    private router: Router,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.subscription = this.firebaseService.token.subscribe((value) => {
      this.token = value;
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.firebaseService.token.next('');
    this.router.navigate(['/']);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
