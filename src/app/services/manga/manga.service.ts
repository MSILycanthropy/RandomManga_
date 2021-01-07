import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IManga } from 'src/app/app.interface';
import { environment } from 'src/environments/environment';
import * as sha1 from 'sha1';

const url = `${environment.apiUrl}/manga`;

@Injectable({
  providedIn: 'root',
})
export class MangaService {
  mangas: Array<IManga> = [];

  constructor(private http: HttpClient) {}

  async getDailies() {
    return await this.http.get(`${url}/dailies`).toPromise();
  }

  getByGenre(
    type: string,
    include: Array<string>,
    exclude: Array<string>,
    minScore: number,
    isFinished: boolean,
    amount: number
  ): Observable<any> {
    if (environment.production) {
      const hash = sha1(
        `${type}${environment.SECRET}${include.join('-')}\
        ${exclude.join('-')}${minScore}${amount}`.replace(/ /g, '')
      );

      return this.http.get(
        `${url}/${type}/${include.join('-')}/${exclude.join(
          '-'
        )}/${minScore}/${isFinished}/${amount}?gamma=${hash}`
      );
    } else {
      return this.http.get(
        `${url}/${type}/${include.join('-')}/${exclude.join(
          '-'
        )}/${minScore}/${isFinished}/${amount}`
      );
    }
  }
}
