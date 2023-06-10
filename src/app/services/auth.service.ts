import { Injectable } from '@angular/core';
import { AuthenticationClient } from './authentication.client';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';
import { Claims } from '../models/claims.enum';
import jwtDecode from 'jwt-decode';
import { CreateUser } from '../models/create-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'token';
  private userKey = 'user';
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

  public register(user: CreateUser): void {
    this.authenticationClient
      .register(user)
      .subscribe((result) => {
        if (result) {
          const decodedToken = jwtDecode<any>(result);
          const user = new User (
            decodedToken[Claims.NameTokenKey],
            decodedToken[Claims.EmailTokenKey],
            decodedToken[Claims.RoleTokenKey],
            result
          )
  
        localStorage.setItem(this.userKey, JSON.stringify(user));
        this.router.navigate(['/']);
      }
      });
  }

  public logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    const user = this.getUser();
    if (user) {
      return user.token != null && user.token.length > 1;
    }
    return false;
  }

  public getUser(): User | null {
    const userJson = localStorage.getItem(this.userKey);
    if (userJson) {
      let user: User = JSON.parse(userJson);
      return user;
    }
    return null;
  }

  public getToken(): string | null {
    const user = this.getUser();
    if (user) {
      return user.token;
    }
    return null;
  }

  public get hasError(): boolean{
    return this.loginError;
  }

  private handleSuccessAuthentication(result: string): void {

    if (result) {
        const decodedToken = jwtDecode<any>(result);
        const user = new User (
          decodedToken[Claims.NameTokenKey],
          decodedToken[Claims.EmailTokenKey],
          decodedToken[Claims.RoleTokenKey],
          result
        )

      localStorage.setItem(this.userKey, JSON.stringify(user));
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