import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IManga } from 'src/app/app.interface';
import { environment } from 'src/environments/environment';

const url = `${environment.apiUrl}/manga`;

@Injectable({
  providedIn: 'root',
})
export class MangaService {
  mangas: Array<IManga> = [];

  constructor(private http: HttpClient) {}

  getByGenre(
    type: string,
    include: Array<string>,
    exclude: Array<string>,
    minScore: number,
    isFinished: boolean,
    amount: number
  ): Observable<any> {
    return this.http.get(
      `${url}/${type}/${include.join('-')}/${exclude.join(
        '-'
      )}/${minScore}/${isFinished}/${amount}`
    );
  }
}
