import { HttpClient } from '@angular/common/http';
import { afterRender, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = 'https://dummyjson.com/auth/login';
  public key = 'token';
  public hasToken!: boolean;

  constructor(private http: HttpClient, private route: Router) {
    afterRender(() => {
      this.hasToken = !!localStorage.getItem(this.key);
    });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { username, password }).pipe(
      tap((response: any) => {
        if (response?.token) {
          localStorage.setItem(this.key, response.token);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.key);
    this.route.navigate(['/login']);
    return;
  }

  isLoggedIn(): boolean {
    return this.hasToken;
  }
}
