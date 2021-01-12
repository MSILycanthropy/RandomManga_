import { ViewChildren } from '@angular/core';
import { QueryList } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MangaService } from 'src/app/services/manga/manga.service';
import { ExpandoCardComponent } from '../expando-card/expando-card.component';
import { environment } from 'src/environments/environment';
import { isObservable } from 'rxjs';
import { faFacebookSquare, faTwitterSquare, faRedditSquare, faTumblrSquare } from '@fortawesome/free-brands-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { IManga } from 'src/app/app.interface';
import { ReportErrorService } from 'src/app/services/report-error/report-error.service';
import { Router } from '@angular/router';

@Component({
  selector: 'generated-list',
  templateUrl: './generated-list.component.html',
  styleUrls: ['./generated-list.component.scss'],
})
export class GeneratedListComponent implements OnInit {
  mangas: Array<IManga>;
  currentIndex: number;
  isMaxIndex: boolean;
  isMinIndex: boolean;
  @ViewChildren(ExpandoCardComponent) expandos: QueryList<ExpandoCardComponent>;
  url: string;
  faFacebook = faFacebookSquare;
  faTwitter = faTwitterSquare;
  faReddit = faRedditSquare;
  faTumblr = faTumblrSquare;
  faPlusCircle = faPlusCircle;
  mangaSynonyms: Array<string>;
  innerUrl: string;

  constructor(
    private mangaService: MangaService,
    public _DomSanitizer: DomSanitizer,
    private reportService: ReportErrorService,
    private router: Router
  ) {
    this.mangas = [];
    this.currentIndex = 0;
    this.isMaxIndex = false;
    this.isMinIndex = true;
  }

  ngOnInit(): void {
    this.mangas = this.mangaService.mangas;

    if (this.mangas[this.currentIndex]) {
      this.getImage(this.mangas[this.currentIndex]._id);
      this.getInnerUrl(this.mangas[this.currentIndex]._id);
    }
  }

  getImage(id: string): void {
    this.url = `${environment.apiUrl}/assets/manga-images-${id}.jpg`;
  }

  defaultUrl(): void {
    this.url = `${environment.apiUrl}/assets/manga-images-notfound.jpg`;
  }

  getInnerUrl(id: string) {
    this.innerUrl = `${environment.siteUrl}/manga?id=${id}`;
  }

  increment(): void {
    this.currentIndex++;
    this.expandos.forEach((expando) => {
      expando.reset();
    });

    this.getImage(this.mangas[this.currentIndex]._id);
    this.getInnerUrl(this.mangas[this.currentIndex]._id);
  }

  decrement(): void {
    this.currentIndex--;
    this.expandos.forEach((expando) => {
      expando.reset();
    });

    this.getImage(this.mangas[this.currentIndex]._id);
    this.getInnerUrl(this.mangas[this.currentIndex]._id);
  }

  setReportAndRoute(): void {
    this.reportService.manga = this.mangas[this.currentIndex];

    this.router.navigate(['/manga/report']);
  }

  setViewMangaAndRoute(): void {
    this.mangaService.viewManga = this.mangas[this.currentIndex];

    this.router.navigate(['/manga'], { queryParams: { id: this.mangas[this.currentIndex]._id } });
  }
}
