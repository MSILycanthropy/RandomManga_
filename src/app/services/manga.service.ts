import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const url = 'http://localhost:8000/manga';

@Injectable({
  providedIn: 'root',
})
export class MangaService {
  constructor(private http: HttpClient) {}

  getByGenre(include: Array<string>, exclude: Array<string>): Observable<any> {
    return this.http.get(`${url}/${include.join('-')}/${exclude.join('-')}`);
  }
}
