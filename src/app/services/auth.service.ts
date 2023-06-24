import { Injectable } from '@angular/core';
import { AuthenticationClient } from './authentication.client';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';
import { Claims } from '../models/claims.enum';
import jwtDecode from 'jwt-decode';
import { CreateUser } from '../models/create-user';
import { AppRegisterUserErrorList } from '../models/app-error';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private userKey = 'user';
  private loginError = false;
  private errors: AppRegisterUserErrorList | null = null;

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
    this.errors = null;
    this.authenticationClient
      .register(user)
      .subscribe({
        next: (result) => {
          if (result) {
            const decodedToken = jwtDecode<any>(result);
            const user = new User (
              decodedToken[Claims.SidTokenKey],
              decodedToken[Claims.NameTokenKey],
              decodedToken[Claims.EmailTokenKey],
              decodedToken[Claims.RoleTokenKey],
              decodedToken[Claims.UserDataTokenKey],
              result
            )
    
          localStorage.setItem(this.userKey, JSON.stringify(user));
          this.router.navigate(['/']);
          }
      },
        error: (error: HttpErrorResponse) => {
          this.handleFailedAuthentication(error);
        }
    });
  }

  public logout() {
    localStorage.removeItem(this.userKey);
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

  public get errorList(): AppRegisterUserErrorList | null {
    return this.errors;
  }

  public sendResetPasswordEmail(email: string){
    console.log(email);
    this.authenticationClient.sendResetPasswordEmail(email).subscribe(result => {
      this.router.navigate(['/login']);
    })
  }

  resetPassword(userId: string, token: string, password: string) {
    this.errors = null;
    this.authenticationClient.sendResetPassword(userId, token, password).subscribe({
      next: (result) => {
        this.router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
        this.handleFailedAuthentication(error);
      }
    })
  }

  private handleSuccessAuthentication(result: string): void {

    if (result) {
        const decodedToken = jwtDecode<any>(result);
        const user = new User (
          decodedToken[Claims.SidTokenKey],
          decodedToken[Claims.NameTokenKey],
          decodedToken[Claims.EmailTokenKey],
          decodedToken[Claims.RoleTokenKey],
          decodedToken[Claims.UserDataTokenKey],
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
    if(error.status == 400){
      let appError: AppRegisterUserErrorList = JSON.parse(error.error).errors;
      this.errors = appError;
    }
  };
}