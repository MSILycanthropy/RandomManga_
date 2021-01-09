import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IManga } from 'src/app/app.interface';
import { MangaService } from 'src/app/services/manga/manga.service';
import { environment } from 'src/environments/environment';
import { faInfinity, faCog, faListUl } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  dailies: Array<IManga>;
  urls: Array<string>;
  innerUrls: Array<string>;
  baseUrl: string;
  faInfinity = faInfinity;
  faCog = faCog;
  faList = faListUl;

  currentDailyIndex: number;

  constructor(public _DomSanitizer: DomSanitizer, private mangaService: MangaService) {}

  async ngOnInit(): Promise<void> {
    this.currentDailyIndex = 0;
    this.baseUrl = `${environment.apiUrl}/assets/manga-images-`;
    this.dailies = await this.mangaService.getDailies();
    this.urls = Array<string>(this.dailies.length);
    this.innerUrls = Array<string>(this.dailies.length);
    this.dailies.forEach((d, i) => {
      this.urls[i] = `${this.baseUrl}${d._id}.jpg`;
      this.innerUrls[i] = `${environment.siteUrl}/manga?id=${d._id}`;
    });
  }

  defaultUrl(i: number) {
    this.urls[i] = `${environment.apiUrl}/assets/manga-images-notfound.jpg`;
  }
}
