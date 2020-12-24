import { ViewChildren } from '@angular/core';
import { QueryList } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MangaService } from 'src/app/services/manga/manga.service';
import { ExpandoCardComponent } from '../expando-card/expando-card.component';

@Component({
  selector: 'generated-list',
  templateUrl: './generated-list.component.html',
  styleUrls: ['./generated-list.component.scss'],
})
export class GeneratedListComponent implements OnInit {
  mangas: Array<any>;
  currentIndex: number;
  isMaxIndex: boolean;
  isMinIndex: boolean;
  @ViewChildren(ExpandoCardComponent) expandos: QueryList<ExpandoCardComponent>;
  readMore: boolean;
  url: string;

  increment(): void {
    this.currentIndex++;
    this.expandos.forEach((expando) => {
      expando.reset();
    });

    this.readMore = true;
    this.getImage(this.mangas[this.currentIndex]._id);
  }

  decrement(): void {
    this.currentIndex--;
    this.expandos.forEach((expando) => {
      expando.reset();
    });

    this.readMore = true;
    this.getImage(this.mangas[this.currentIndex]._id);
    this.readMore = !this.readMore;
  }

  constructor(
    private mangaService: MangaService,
    public _DomSanitizer: DomSanitizer
  ) {
    this.mangas = [];
    this.currentIndex = 0;
    this.isMaxIndex = false;
    this.isMinIndex = true;
  }

  getImage(id: string): void {
    this.url = `http://localhost:8000/assets/manga/images/${id}.jpg`;
  }

  defaultUrl(): void {
    this.url = 'http://localhost:8000/assets/manga/images/notfound.jpg';
  }

  ngOnInit(): void {
    this.mangas = this.mangaService.mangas;
    this.getImage(this.mangas[this.currentIndex]._id);
    this.readMore = true;

    console.log(this.mangas[this.currentIndex].Synopsis);
  }
}
