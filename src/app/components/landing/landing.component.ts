import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
  dailies: any;
  url: string;
  faInfinity = faInfinity;
  faCog = faCog;
  faList = faListUl;

  constructor(
    public _DomSanitizer: DomSanitizer,
    private mangaService: MangaService
  ) {}

  async ngOnInit(): Promise<void> {
    this.url = `${environment.apiUrl}/assets/manga-images-`;
    this.dailies = await this.mangaService.getDailies();
  }

  defaultUrl(): void {
    this.url = `${environment.apiUrl}/assets/manga-images-notfound.jpg`;
  }
}
