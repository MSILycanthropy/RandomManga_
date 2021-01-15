import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IManga } from 'src/app/app.interface';
import { MangaService } from 'src/app/services/manga/manga.service';
import { faFacebookSquare, faTwitterSquare, faRedditSquare, faTumblrSquare } from '@fortawesome/free-brands-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { escapeRegExp } from '@angular/compiler/src/util';
import { ReportErrorService } from 'src/app/services/report-error/report-error.service';

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
  notFound: boolean;
  constructor(
    private router: ActivatedRoute,
    public manga_service: MangaService,
    public _DomSanitizer: DomSanitizer,
    private navRouter: Router,
    private report_service: ReportErrorService
  ) {}

  async ngOnInit(): Promise<void> {
    this.notFound = false;
    this.baseUrl = `${environment.apiUrl}/assets/manga-images-`;
    this.id = this.router.snapshot.queryParamMap.get('id');

    if (this.manga_service.viewManga) {
      this.manga = this.manga_service.viewManga;
      this.id = this.manga._id;
    } else if (this.id) {
      this.manga = await this.manga_service.getById(this.id);
      if (!this.manga) {
        this.notFound = true;
      }
    } else {
      this.notFound = true;
    }

    this.url = `${this.baseUrl}${this.id}.jpg`;
  }

  setReportAndRoute(): void {
    this.report_service.manga = this.manga;

    this.navRouter.navigate(['/manga/report'], { queryParams: { id: this.manga._id } });
  }
}
