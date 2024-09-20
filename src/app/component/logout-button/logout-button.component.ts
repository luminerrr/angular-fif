import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.css',
})
export class LogoutButtonComponent {
  isLoggedIn: boolean = false;

  constructor(public auth: AuthenticationService) {
    this.isLoggedIn = !!auth.isLoggedIn();
    console.log('isloggedin', this.isLoggedIn);
  }
}
