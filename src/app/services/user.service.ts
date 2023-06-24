import { Injectable } from '@angular/core';
import { AppUser } from '../models/app-user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { StateEnum } from '../models/state.enum';
import { UpdateUser } from '../models/update-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  public getAllUsers(): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(environment.apiUrl + 'api/users')
  }

  public getUser(userId: string): Observable<UpdateUser> {
    return this.http.get<UpdateUser>(environment.apiUrl + 'api/users/'+userId)
  }

  public setUserState(userId: string, userState: StateEnum): Observable<boolean> {
    return this.http.post<boolean>(environment.apiUrl + 'api/users', {userId: userId, userState: userState} );
  }

  public updateUser(userId: string, user: UpdateUser): Observable<boolean>{
    return this.http.put<boolean>(environment.apiUrl + 'api/users/'+userId, user);
  }
}
