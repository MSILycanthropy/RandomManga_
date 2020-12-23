import { Component, OnInit } from '@angular/core';
import { faCheck, faMinus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { GenreService } from 'src/app/services/genre.service';
import { MangaService } from 'src/app/services/manga.service';

@Component({
  selector: 'generator-form',
  templateUrl: './generator-form.component.html',
  styleUrls: ['./generator-form.component.scss'],
})
export class GeneratorFormComponent implements OnInit {
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
  mangaTypes: Array<string> = [
    'All',
    'Manga',
    'Manhwa',
    'Manhua',
    'One-shot',
    'Doujinshi',
  ];
  searchType: string;
  scoreNumbers: Array<number> = Array.from(new Array(20).keys()).map(
    (x) => x / 2
  );
  listNumbers: Array<number> = [1, 5, 10].concat(
    Array.from(new Array(10).keys()).map((x) => (100 * (x + 1)) / 2)
  );
  searchMinScore: number;
  searchAmount: number;
  isFinished: boolean;
  isUnscored: boolean;

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
    this.searchType = 'All';
    this.searchMinScore = 0;
    this.searchAmount = 250;
    this.isFinished = false;
    this.isUnscored = false;
  }
}
