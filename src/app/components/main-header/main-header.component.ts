import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import { MangaService } from 'src/app/services/manga/manga.service';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  faBars = faBars;
  faSearch = faSearch;
  searchForm: FormGroup;
  query = new FormControl('');
  constructor(private manga_service: MangaService, private router: Router) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      query: this.query,
    });
  }

  toggleSideNav(): void {
    if (document.getElementById('sideNav').style.height == '0px' || !document.getElementById('sideNav').style.height) {
      document.getElementById('sideNav').style.height = '200px';
      document.getElementById('sideNav').style.borderTop = '1px solid white';
    } else if (document.getElementById('sideNav').style.height == '200px') {
      document.getElementById('sideNav').style.height = '0';
      document.getElementById('sideNav').style.borderTop = 'none';
    }
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
