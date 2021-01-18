import { ChangeDetectorRef, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { IManga } from 'src/app/app.interface';
import { MangaService } from 'src/app/services/manga/manga.service';
import { SearchPortionComponent } from '../search-portion/search-portion.component';

@Component({
  selector: 'search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss'],
})
export class SearchListComponent implements OnInit {
  mangas: Array<IManga>;
  currentLastIndex: number;
  currentFirstIndex;
  faSearch = faSearch;
  searchForm: FormGroup;
  query = new FormControl('');
  @ViewChild('searchContainer', { read: ViewContainerRef }) searchContainer;

  constructor(
    private manga_service: MangaService,
    private router: Router,
    private resolver: ComponentFactoryResolver,
    private cdRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentFirstIndex = 0;
    this.currentLastIndex = 11;
    this.mangas = this.manga_service.searched;

    this.searchForm = new FormGroup({
      query: this.query,
    });

    this.query.setValue(this.activatedRoute.snapshot.queryParamMap.get('query'));
  }

  ngAfterViewInit(): void {
    this.showMore(this.currentFirstIndex, this.currentLastIndex);
    this.cdRef.detectChanges();
  }

  showMore(firstIndex: number, lastIndex: number): void {
    const temp = [...this.mangas];
    const factory = this.resolver.resolveComponentFactory(SearchPortionComponent);
    const compontentRef = this.searchContainer.createComponent(factory);

    compontentRef.instance.mangas = temp.slice(firstIndex, lastIndex);
  }

  incrementIndices(): void {
    this.currentFirstIndex = this.currentLastIndex;
    this.currentLastIndex += 10;
  }

  onSubmit(): void {
    if (this.query.value) {
      this.manga_service.search(this.query.value).subscribe((mangas) => {
        this.manga_service.searched = mangas;
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => this.router.navigate(['/manga/search'], { queryParams: { query: this.query.value } }));
      });
    }
  }
}
