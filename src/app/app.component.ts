import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogoutButtonComponent } from './component/logout-button/logout-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LogoutButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
