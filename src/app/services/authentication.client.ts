import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { User } from '../models/user';
import { CreateUser } from '../models/create-user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationClient {

  constructor(private http: HttpClient) {}

  public login(username: string, password: string): Observable<string> {
    return this.http.post(
      environment.apiUrl + 'api/authenticate/login',
      {
        username: username,
        password: password,
      },
      { responseType: 'text' }
    )
  }

  public register(
    user: CreateUser
  ): Observable<string> {
    return this.http.post(
      environment.apiUrl + 'api/authenticate/register',
      user,
      { responseType: 'text' }
    );
  }
}