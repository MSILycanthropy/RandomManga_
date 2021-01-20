import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCheck, faMinus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { GenreService } from 'src/app/services/genre/genre.service';
import { MangaService } from 'src/app/services/manga/manga.service';

@Component({
  selector: 'generator-form',
  templateUrl: './generator-form.component.html',
  styleUrls: ['./generator-form.component.scss'],
})
export class GeneratorFormComponent implements OnInit {
  title = 'RandomManga';
  genres: Array<any> = [];
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
  mangaTypes: Array<string> = ['All', 'JP', 'KR', 'CN', 'TW'];
  searchType: string;
  scoreNumbers: Array<any> = ['Any', ...Array.from(new Array(20).keys()).map((x) => x / 2)];
  listNumbers: Array<number> = [1, 5, 10].concat(Array.from(new Array(10).keys()).map((x) => (100 * (x + 1)) / 2));
  searchMinScore: any;
  searchAmount: number;
  isFinished: boolean;
  isUnscored: boolean;
  nfoldDefault: object;

  private includeGenres = Array<string>();
  private excludeGenres = Array<string>();

  constructor(private genreService: GenreService, private mangaService: MangaService, private route: Router) {}

  ngOnInit() {
    this.getGenres();
    this.searchType = 'All';
    this.searchMinScore = 'Any';
    this.searchAmount = 250;
    this.isFinished = false;
    this.isUnscored = false;
    this.nfoldDefault = this.selectableValues[2];
  }

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
    if (this.searchMinScore == 'Any') {
      this.searchMinScore = NaN;
    }
    this.mangaService
      .getByGenre(this.searchType, this.includeGenres, this.excludeGenres, this.searchMinScore, this.isFinished, this.searchAmount)
      .subscribe((mangas) => {
        this.mangaService.mangas = mangas;
        this.route.navigate(['/list']);
      });
  }

  onGenreToggle(value) {
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

    if (
      value.every(function (x) {
        return x == 0;
      }) ||
      value.every(function (x) {
        return x == 1;
      }) ||
      value.every(function (x) {
        return x == -1;
      })
    ) {
      switch (value[0]) {
        case -1:
          this.nfoldDefault = this.selectableValues[1];
          break;
        case 0:
          this.nfoldDefault = this.selectableValues[2];
          break;
        case 1:
          this.nfoldDefault = this.selectableValues[0];
          break;
        default:
          console.error('You somehow got a value that isnt in any of the arrays');
      }
    } else {
      this.nfoldDefault = undefined;
    }
  }

  checkOneShot(): boolean {
    if (this.searchType == 'One-shot') {
      this.isFinished = true;
      return true;
    } else {
      return false;
    }
  }
}
