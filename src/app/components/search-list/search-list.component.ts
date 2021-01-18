import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private manga_service: MangaService, private router: ActivatedRoute, private resolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    this.router.queryParams.subscribe((queryParams) => {
      this.currentFirstIndex = 0;
      this.currentLastIndex = 11;
      this.mangas = this.manga_service.searched;
    });

    this.searchForm = new FormGroup({
      query: this.query,
    });
  }

  showMore(): void {
    this.currentFirstIndex = this.currentLastIndex;
    this.currentLastIndex += 10;

    const factory = this.resolver.resolveComponentFactory(SearchPortionComponent);
    const compontentRef: SearchPortionComponent = this.searchContainer.createComponent(factory);
    compontentRef.mangas = this.mangas.slice(this.currentFirstIndex, this.currentLastIndex);
  }

  onSubmit(): void {
    if (this.query.value) {
      this.manga_service.search(this.query.value).subscribe((mangas) => {
        this.manga_service.searched = mangas;
        this.mangas = mangas;
      });
    }
  }
}
