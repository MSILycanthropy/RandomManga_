import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { faFacebookSquare, faTwitterSquare, faRedditSquare, faTumblrSquare } from '@fortawesome/free-brands-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { IManga } from 'src/app/app.interface';
import { MangaService } from 'src/app/services/manga/manga.service';
import { ReportErrorService } from 'src/app/services/report-error/report-error.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'search-portion',
  templateUrl: './search-portion.component.html',
  styleUrls: ['./search-portion.component.scss'],
})
export class SearchPortionComponent implements OnInit {
  @Input() mangas: Array<IManga>;
  urls: Array<string>;
  baseUrl: string;
  shareUrls: Array<string>;
  facebookLinks: Array<string>;
  twitterLinks: Array<string>;
  redditLinks: Array<string>;
  tumblrLinks: Array<string>;
  faFacebook = faFacebookSquare;
  faTwitter = faTwitterSquare;
  faReddit = faRedditSquare;
  faTumblr = faTumblrSquare;
  faPlusCircle = faPlusCircle;

  constructor(
    private manga_service: MangaService,
    public _DomSanitizer: DomSanitizer,
    private router: Router,
    private report_service: ReportErrorService
  ) {
    this.mangas = [];
  }

  ngOnInit(): void {
    this.urls = new Array<string>(this.mangas.length);
    this.shareUrls = new Array<string>(this.mangas.length);
    this.facebookLinks = new Array<string>(this.mangas.length);
    this.twitterLinks = new Array<string>(this.mangas.length);
    this.redditLinks = new Array<string>(this.mangas.length);
    this.tumblrLinks = new Array<string>(this.mangas.length);
    this.setMangas();
  }

  setMangas(): void {
    this.baseUrl = `${environment.apiUrl}/assets/manga-images-`;

    this.mangas.forEach((manga, i) => {
      this.urls[i] = `${this.baseUrl}${manga._id}.jpg`;
      this.shareUrls[i] = `https%3A%2F%2Frngmanga.com%2Fmanga%3Fid%3D${manga._id}`;
      this.facebookLinks[i] = `https://www.facebook.com/sharer/sharer.php?u=${this.shareUrls[i]}&amp;src=sdkpreparse`;
      this.twitterLinks[i] = `https://twitter.com/intent/tweet?text=${this.shareUrls[i]}`;
      this.redditLinks[i] = `http://www.reddit.com/submit?url=${this.shareUrls[i]}`;
      this.tumblrLinks[i] = `http://tumblr.com/widgets/share/tool?canonicalUrl=${this.shareUrls[i]}`;
    });
  }

  authorObjToString(authors: Object[]): string {
    let out: string;
    for (let author of authors) {
      if (author['name']['last'] && author['name']['first']) {
        if (!out) {
          out = `${author['name']['last']}, ${author['name']['first']}`;
          continue;
        }
        out = `${out}; ${author['name']['last']}, ${author['name']['first']}`;
      } else if (!author['name']['last'] && author['name']['first']) {
        if (!out) {
          out = `${author['name']['first']}`;
          continue;
        }
        out = `${out}; ${author['name']['first']}`;
      } else if (author['name']['last'] && !author['name']['first']) {
        if (!out) {
          out = `${author['name']['last']}`;
          continue;
        }
        out = `${out}; ${author['name']['last']}`;
      }
    }
    return out;
  }

  setReportAndRoute(i): void {
    this.report_service.manga = this.mangas[i];

    this.router.navigate(['/manga/report'], { queryParams: { id: this.mangas[i]._id } });
  }

  setViewAndRoute(i): void {
    this.manga_service.viewManga = this.mangas[i];

    this.router.navigate(['/manga'], { queryParams: { id: this.mangas[i]._id } });
  }
}
