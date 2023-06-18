import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileReadingService {

  constructor(private httpClient: HttpClient) { }

  public getDataFromFile(filepath: string) {
    // if(!this.dataDictionary[filepath]){
    //   this.dataDictionary[filepath] = this.httpClient.get<string>(filepath).pipe(
    //     shareReplay(1)
    //   );
    // }
    // return this.dataDictionary[filepath];
    return this.httpClient.get(filepath, { responseType: 'text' })
  }
}
