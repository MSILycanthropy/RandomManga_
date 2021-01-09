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

  increment(): void {
    this.currentIndex++;
    this.expandos.forEach((expando) => {
      expando.reset();
    });

    this.getImage(this.mangas[this.currentIndex]._id);
  }

  decrement(): void {
    this.currentIndex--;
    this.expandos.forEach((expando) => {
      expando.reset();
    });
    this.getImage(this.mangas[this.currentIndex]._id);
  }

  constructor(private mangaService: MangaService, public _DomSanitizer: DomSanitizer) {
    this.mangas = [];
    this.currentIndex = 0;
    this.isMaxIndex = false;
    this.isMinIndex = true;
  }

  getImage(id: string): void {
    this.url = `${environment.apiUrl}/assets/manga-images-${id}.jpg`;
  }

  defaultUrl(): void {
    this.url = `${environment.apiUrl}/assets/manga-images-notfound.jpg`;
  }

  ngOnInit(): void {
    this.mangas = this.mangaService.mangas;

    if (this.mangas[this.currentIndex]) {
      this.getImage(this.mangas[this.currentIndex]._id);
    }
  }
}
