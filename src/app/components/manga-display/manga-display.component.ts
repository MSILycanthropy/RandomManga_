import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IManga } from 'src/app/app.interface';
import { MangaService } from 'src/app/services/manga/manga.service';
import { faFacebookSquare, faTwitterSquare, faRedditSquare, faTumblrSquare } from '@fortawesome/free-brands-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ReportErrorService } from 'src/app/services/report-error/report-error.service';

@Component({
  selector: 'manga-display',
  templateUrl: './manga-display.component.html',
  styleUrls: ['./manga-display.component.scss'],
})
export class MangaDisplayComponent implements OnInit {
  id: string;
  @Input() manga: IManga;
  url: string;
  baseUrl: string;
  faFacebook = faFacebookSquare;
  faTwitter = faTwitterSquare;
  faReddit = faRedditSquare;
  faTumblr = faTumblrSquare;
  faPlusCircle = faPlusCircle;
  notFound: boolean;
  twitterLink: string;
  facebookLink: string;
  redditLink: string;
  tumblrLink: string;
  shareUrl: string;

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

    this.url = `${this.baseUrl}${this.manga._id}.jpg`;
    this.shareUrl = `https%3A%2F%2Frngmanga.com%2Fmanga%3Fid%3D${this.manga._id}`;
    this.facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${this.shareUrl}&amp;src=sdkpreparse`;
    this.twitterLink = `https://twitter.com/intent/tweet?text=${this.shareUrl}`;
    this.redditLink = `http://www.reddit.com/submit?url=${this.shareUrl}`;
    this.tumblrLink = `http://tumblr.com/widgets/share/tool?canonicalUrl=${this.shareUrl}`;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.url = `${this.baseUrl}${this.manga._id}.jpg`;
    this.shareUrl = `https%3A%2F%2Frngmanga.com%2Fmanga%3Fid%3D${this.manga._id}`;
    this.facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${this.shareUrl}&amp;src=sdkpreparse`;
    this.twitterLink = `https://twitter.com/intent/tweet?text=${this.shareUrl}`;
    this.redditLink = `http://www.reddit.com/submit?url=${this.shareUrl}`;
    this.tumblrLink = `http://tumblr.com/widgets/share/tool?canonicalUrl=${this.shareUrl}`;
  }

  setReportAndRoute(): void {
    this.report_service.manga = this.manga;

    this.navRouter.navigate(['/manga/report'], { queryParams: { id: this.manga._id } });
  }

  setViewAndRoute(): void {
    this.manga_service.viewManga = this.manga;

    this.navRouter.navigate(['/manga'], { queryParams: { id: this.manga._id } });
  }
}
