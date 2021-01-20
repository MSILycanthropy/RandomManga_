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
  searched: Array<IManga> = [];
  viewManga: IManga;
  constructor(private http: HttpClient) {}

  async getDailies(): Promise<Array<IManga>> {
    return (await this.http.get(`${url}/dailies`).toPromise()) as Array<IManga>;
  }

  async getById(id: string): Promise<IManga> {
    return (await this.http.get(`${url}/${id}`).toPromise())[0] as IManga;
  }

  search(query: string): Observable<any> {
    return this.http.get(`${url}/search/${query}`);
  }

  getByGenre(type: string, include: Array<string>, exclude: Array<string>, minScore: number, isFinished: boolean, amount: number): Observable<any> {
    console.log(type);

    if (environment.production) {
      const hash = sha1(
        `${type}${environment.SECRET}${include.join('-')}\
        ${exclude.join('-')}${minScore}${amount}`.replace(/ /g, '')
      );

      return this.http.get(`${url}/${type}/${include.join('-')}/${exclude.join('-')}/${minScore}/${isFinished}/${amount}?gamma=${hash}`);
    } else {
      console.log(`${url}/${type}/${include.join('-')}/${exclude.join('-')}/${minScore}/${isFinished}/${amount}`);

      return this.http.get(`${url}/${type}/${include.join('-')}/${exclude.join('-')}/${minScore}/${isFinished}/${amount}`);
    }
  }
}
