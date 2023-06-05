import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { NavigationCountry } from '../models/navigation-country';


@Injectable({
  providedIn: 'root'
})
export class CountryNavigationReadingService {

  private dataDictionary: {
    [filepath: string] : Observable<NavigationCountry[]>
  } = {}

  constructor(private httpClient: HttpClient) {
  }

  // obsolete - does not cache
  // public getCountryNavigationFromFile(filepath: string) : Observable<NavigationCountry[]>{
  //   return this.httpClient.get<NavigationCountry[]>(filepath);
  // }

  public getDataFromFile(filepath: string) : Observable<NavigationCountry[]>{
    if(!this.dataDictionary[filepath]){
      this.dataDictionary[filepath] = this.httpClient.get<NavigationCountry[]>(filepath).pipe(
        shareReplay(1)
      );
    }
    return this.dataDictionary[filepath];
  }
}
