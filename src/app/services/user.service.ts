import { Injectable } from '@angular/core';
import { AppUser } from '../models/app-user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  public getAllUsers(): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(environment.apiUrl + 'api/users')
  }
}
