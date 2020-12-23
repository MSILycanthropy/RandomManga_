import { Component } from '@angular/core';
import { GenreService } from './services/genre.service';
import { MangaService } from './services/manga.service';
import { faCheck, faTimes, faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'RandomManga';
  genres: Array<any> = [];
  mangas: Array<any> = [];
  faCheck = faCheck;
  faTimes = faTimes;
  faMinus = faMinus;
  selectableValues: Array<object> = [
    {
      index: 1,
      text: 'Include All',
      fa: faCheck,
    },
    {
      index: -1,
      text: 'Exclude All',
      fa: faTimes,
    },
    {
      index: 0,
      text: 'Neutral All',
      fa: faMinus,
    },
  ];

  private includeGenres = Array<string>();
  private excludeGenres = Array<string>();

  constructor(
    private genreService: GenreService,
    private mangaService: MangaService
  ) {}

  getGenres(): void {
    this.genreService.getAll().subscribe((genres) => {
      genres.forEach((genre) => {
        this.genres.push(genre.genre_name);
      });
    });
  }

  generateList(): void {
    if (this.includeGenres.length == 0) {
      this.includeGenres = ['none'];
    }
    if (this.excludeGenres.length == 0) {
      this.excludeGenres = ['none'];
    }

    this.mangaService
      .getByGenre(this.includeGenres, this.excludeGenres)
      .subscribe((mangas) => {
        this.mangas = mangas;
        console.log('Mangas: ', this.mangas);
      });
  }

  test(value) {
    var tempInclude = [];
    var tempExclude = [];
    for (let i = 0; i < value.length; i++) {
      if (value[i] == 1) {
        tempInclude.push(this.genres[i]);
      } else if (value[i] == -1) {
        tempExclude.push(this.genres[i]);
      }
    }

    this.includeGenres = tempInclude;
    this.excludeGenres = tempExclude;
  }

  ngOnInit() {
    this.getGenres();
  }
}
