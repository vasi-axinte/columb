import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NavigationCountry } from '../models/navigation-country';


@Injectable({
  providedIn: 'root'
})
export class CountryNavigationReadingService {

  constructor(private httpClient: HttpClient) {

  }

  public getCountryNavigationFromFile(filepath: string) : Observable<NavigationCountry[]>{
    return this.httpClient.get<NavigationCountry[]>(filepath);
  }

}
