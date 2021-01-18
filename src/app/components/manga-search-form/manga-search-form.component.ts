import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { MangaService } from 'src/app/services/manga/manga.service';

@Component({
  selector: 'manga-search-form',
  templateUrl: './manga-search-form.component.html',
  styleUrls: ['./manga-search-form.component.scss'],
})
export class MangaSearchFormComponent implements OnInit {
  @Input() width: number;
  faSearch = faSearch;
  searchForm: FormGroup;
  query = new FormControl('');

  constructor(private manga_service: MangaService, private router: Router) {}
  ngOnInit(): void {
    this.searchForm = new FormGroup({
      query: this.query,
    });
  }

  setStyles(): Object {
    return this.width ? { width: `${this.width}px` } : { width: '160px' };
  }

  onSubmit(): void {
    if (this.query.value) {
      this.manga_service.search(this.query.value).subscribe((mangas) => {
        this.manga_service.searched = mangas;
        this.router.navigate(['/manga/search'], { queryParams: { query: this.query.value } });
      });
    }
  }
}
