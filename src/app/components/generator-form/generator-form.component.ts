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
  mangaTypes: Array<string> = ['All', 'Manga', 'Manhwa', 'Manhua', 'One-shot', 'Doujinshi'];
  searchType: string;
  scoreNumbers: Array<number> = Array.from(new Array(20).keys()).map((x) => x / 2);
  listNumbers: Array<number> = [1, 5, 10].concat(Array.from(new Array(10).keys()).map((x) => (100 * (x + 1)) / 2));
  searchMinScore: number;
  searchAmount: number;
  isFinished: boolean;
  isUnscored: boolean;
  nfoldDefault: object;

  private includeGenres = Array<string>();
  private excludeGenres = Array<string>();

  constructor(private genreService: GenreService, private mangaService: MangaService, private route: Router) {}

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

  ngOnInit() {
    this.getGenres();
    this.searchType = 'All';
    this.searchMinScore = 0;
    this.searchAmount = 250;
    this.isFinished = false;
    this.isUnscored = false;
    this.nfoldDefault = this.selectableValues[2];
  }
}
