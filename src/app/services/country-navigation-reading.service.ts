import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
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
      this.dataDictionary[filepath] = this.httpClient.get<any[]>(filepath).pipe(
        map(items => items.map(item => this.normalizeItem(item))),
        shareReplay(1)
      );
    }
    return this.dataDictionary[filepath];
  }

  private normalizeItem(item: any): NavigationCountry {
    const title: string = item.country ?? item.title ?? '';
    const countryCode: string = item.countryCode ?? '';
    const type: string = item.type ?? '';
    const rawUrl: string = item.url ?? '';
    const restricted: boolean = !!item.restrictedToLimitedUser;

    // Internal if explicitly typed or if url looks like an app-relative path
    const isInternal = type === 'in-subpage-url' || (!!rawUrl && !/^https?:\/\//i.test(rawUrl));
    const internalUrl = isInternal ? (rawUrl?.startsWith('/') ? rawUrl : `/${rawUrl}`) : '';
    const externalUrl = isInternal ? '' : rawUrl;

    return {
      country: title,
      countryCode: countryCode,
      url: externalUrl,
      internalUrl: internalUrl,
      restrictedToLimitedUser: restricted,
    } as NavigationCountry;
  }
}
