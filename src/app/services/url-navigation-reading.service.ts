import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { NavigationUrl } from '../models/navigation-url';
import { PolyElement } from '../models/poly-element';

@Injectable({
  providedIn: 'root'
})
export class UrlNavigationReadingService {

  private dataDictionary: {
    [filepath: string] : Observable<NavigationUrl[]>
  } = {}

  private polyDataDictionary: {
    [filepath: string] : Observable<PolyElement[]>
  } = {}

  constructor(private httpClient: HttpClient) {
  }

  // obsolete - does not cache
  // public getCountryNavigationFromFile(filepath: string) : Observable<NavigationCountry[]>{
  //   return this.httpClient.get<NavigationCountry[]>(filepath);
  // }

  public getDataFromFile(filepath: string) : Observable<NavigationUrl[]>{
    if(!this.dataDictionary[filepath]){
      this.dataDictionary[filepath] = this.httpClient.get<NavigationUrl[]>(filepath).pipe(
        shareReplay(1)
      );
    }
    return this.dataDictionary[filepath];
  }

  public getDataFromPolyFile(filepath: string) : Observable<PolyElement[]>{
    if(!this.polyDataDictionary[filepath]){
      this.polyDataDictionary[filepath] = this.httpClient.get<PolyElement[]>(filepath).pipe(
        shareReplay(1)
      );
    }
    return this.polyDataDictionary[filepath];
  }
}
