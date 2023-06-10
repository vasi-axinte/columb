import { Injectable } from '@angular/core';
import { AuthenticationClient } from './authentication.client';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'token';
  private loginError = false;

  constructor(
    private authenticationClient: AuthenticationClient,
    private router: Router
  ) {}

  public login(username: string, password: string) {
    return this.authenticationClient.login(username, password).subscribe({
      next: (result) => {
        this.handleSuccessAuthentication(result);
      },
      error: (error: HttpErrorResponse) => {
        this.handleFailedAuthentication(error);
      }
    })
  };

  public register(username: string, email: string, password: string): void {
    this.authenticationClient
      .register(username, email, password)
      .subscribe((token) => {
        localStorage.setItem(this.tokenKey, token);
        this.router.navigate(['/']);
      });
  }

  public logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }

  public get hasError(): boolean{
    return this.loginError;
  }

  private handleSuccessAuthentication(result: string): void {

    if (result) {
      localStorage.setItem(this.tokenKey, result);
      this.router.navigate(['/']);
    }
    // let message;

    // if (result !== null && result.isSuccess && result.response.length > 1) {
    //   const decodedToken = jwtDecode<any>(result.response);
    //   const user = new User(
    //     decodedToken[Claims.NameTokenKey],
    //     decodedToken[Claims.EmailTokenKey],
    //     decodedToken[Claims.RoleTokenKey],
    //     result.response
    //   )
    //   localStorage.setItem(this.userKey, JSON.stringify(user));

    //   this.router.navigate(['/']);
    //   message = 'User has been authenticated.';
    // } else if (result !== null && !result.isSuccess) {
    //   message = result.errors.join(' ');
    // } else {
    //   message = 'Something went wrong.';
    // }

    // this.snackBar.open(message, 'Close');
  }

  private handleFailedAuthentication(error: HttpErrorResponse): void {
    this.loginError = true;
  }
}