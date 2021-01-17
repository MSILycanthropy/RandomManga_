import { Component, OnInit, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MangaService } from 'src/app/services/manga/manga.service';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { IManga } from 'src/app/app.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'generated-list',
  templateUrl: './generated-list.component.html',
  styleUrls: ['./generated-list.component.scss'],
  animations: [
    trigger('buttonFade', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0, background: 'rgb(0,0,0,1)' }), animate(1500)]),
      transition(':leave', animate(1500, style({ opacity: 0, background: 'rgb(0,0,0,1)' }))),
    ]),
    trigger('arrowFade', [
      state('out', style({ opacity: 0 })),
      transition(':enter', [style({ opacity: 1 }), animate(1500)]),
      transition(':leave', animate(1500, style({ opacity: 0 }))),
    ]),
  ],
})
export class GeneratedListComponent implements OnInit {
  mangas: Array<IManga>;
  currentIndex: number;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;

  constructor(
    private mangaService: MangaService,
    public _DomSanitizer: DomSanitizer,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private renderer: Renderer2
  ) {
    this.mangas = [];
    this.currentIndex = 0;
  }

  ngOnInit(): void {
    this.mangas = this.mangaService.mangas;

    if (this.mangas[this.currentIndex]) {
      this.changeQueryString();
    }
  }

  increment(): void {
    this.currentIndex++;

    this.changeQueryString();
  }

  decrement(): void {
    this.currentIndex--;

    this.changeQueryString();
  }

  changeQueryString(): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { id: this.mangas[this.currentIndex]._id },
      queryParamsHandling: 'merge',
    });
  }
}
