import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IManga } from 'src/app/app.interface';
import { MangaService } from 'src/app/services/manga/manga.service';
import { faFacebookSquare, faTwitterSquare, faRedditSquare, faTumblrSquare } from '@fortawesome/free-brands-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'manga-display',
  templateUrl: './manga-display.component.html',
  styleUrls: ['./manga-display.component.scss'],
})
export class MangaDisplayComponent implements OnInit {
  id: string;
  manga: IManga;
  url: string;
  baseUrl: string;
  faFacebook = faFacebookSquare;
  faTwitter = faTwitterSquare;
  faReddit = faRedditSquare;
  faTumblr = faTumblrSquare;
  faPlusCircle = faPlusCircle;

  constructor(private router: ActivatedRoute, public manga_service: MangaService, public _DomSanitizer: DomSanitizer) {}

  async ngOnInit(): Promise<void> {
    this.baseUrl = `${environment.apiUrl}/assets/manga-images-`;
    this.id = this.router.snapshot.queryParamMap.get('id');
    this.url = `${this.baseUrl}${this.id}.jpg`;
    this.manga = await this.manga_service.getById(this.id);

    console.log(this.manga);
  }

  defaultUrl() {
    this.url = `${environment.apiUrl}/assets/manga-images-notfound.jpg`;
  }
}
