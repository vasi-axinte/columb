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
    const rawInternalProp: string = item.internalUrl ?? '';
    const restricted: boolean = !!item.restrictedToLimitedUser;

    // Internal if explicitly typed or if url looks like an app-relative path
    const looksExternal = /^https?:\/\//i.test(rawUrl);
    let internalUrl = '';
    let externalUrl = '';

    if (type === 'in-subpage-url' || !!rawInternalProp) {
      // Subpage-relative internal navigation: ensure no leading slash
      const segment = (rawInternalProp || rawUrl).toString();
      internalUrl = segment.replace(/^\/+/, '');
    } else if (!!rawUrl && !looksExternal) {
      // App-absolute internal navigation: keep leading slash
      internalUrl = rawUrl.startsWith('/') ? rawUrl : `/${rawUrl}`;
    } else {
      externalUrl = rawUrl;
    }

    return {
      country: title,
      countryCode: countryCode,
      url: externalUrl,
      internalUrl: internalUrl,
      restrictedToLimitedUser: restricted,
    } as NavigationCountry;
  }
}
