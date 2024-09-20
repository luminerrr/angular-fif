import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = 'emilys';
  password: string = 'emilyspass';
  constructor(private auth: AuthenticationService, private router: Router) {}

  login() {
    this.auth.login(this.username, this.password).subscribe({
      next: (data) => {
        this.router.navigate([""])
        this.auth.hasToken = true;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
