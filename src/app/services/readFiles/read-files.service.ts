import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReadFilesService {

  constructor(private httpClient: HttpClient) { }


  public readCSV(path: string) {
    return this.httpClient.get(path, { responseType: 'text' }).pipe(
      map(response => response)
    );

  }
}
