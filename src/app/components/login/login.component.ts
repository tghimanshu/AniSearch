import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  error!: string;

  constructor(
    private firebaseService: FirebaseService,
    private route: Router
  ) {}

  ngOnInit(): void {}

  submit() {
    if (this.form.valid) {
      this.firebaseService
        .login(this.form.value['email'], this.form.value['password'])
        .subscribe({
          next: (data) => {
            localStorage.setItem('token', data.idToken);
            this.firebaseService.token.next(data.idToken);
            this.route.navigate(['/']);
          },
          error: (error: HttpErrorResponse) => {
            this.error = error.error.error.message;
            setTimeout(() => (this.error = ''), 3000);
          },
        });
    }
  }
}
