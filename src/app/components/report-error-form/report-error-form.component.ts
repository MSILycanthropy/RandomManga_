import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IManga } from 'src/app/app.interface';
import { MangaService } from 'src/app/services/manga/manga.service';
import { ReportErrorService } from 'src/app/services/report-error/report-error.service';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'report-error-form',
  templateUrl: './report-error-form.component.html',
  styleUrls: ['./report-error-form.component.scss'],
})
export class ReportErrorFormComponent implements OnInit {
  contactUrl: string;
  form: FormGroup;
  triedSubmit: boolean;
  hasErrors: boolean;
  manga: IManga;
  notFound: boolean;
  title = new FormControl();
  englishTitle = new FormControl();
  alternateTitles = new FormControl();
  type = new FormControl();
  authors = new FormControl();
  volumes = new FormControl();
  chapters = new FormControl();
  startDate = new FormControl();
  endDate = new FormControl();
  finished = new FormControl();
  genres = new FormControl();
  synopsis = new FormControl();
  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  other = new FormControl('');

  mangaTypes: Array<string> = ['Manga', 'Manhwa', 'Manhua', 'One-shot', 'Doujinshi', 'Novel'];

  faEdit = faEdit;

  @ViewChild('modal') modal;
  @ViewChild('successModal') successModal;

  constructor(
    private fb: FormBuilder,
    private report: ReportErrorService,
    private router: ActivatedRoute,
    private manga_service: MangaService,
    private el: ElementRef,
    private http: HttpClient
  ) {}

  async ngOnInit(): Promise<void> {
    this.contactUrl = `${environment.apiUrl}/contact/report`;
    this.notFound = false;
    let id = this.router.snapshot.queryParamMap.get('id');
    if (this.report.manga) {
      this.manga = this.report.manga;
    } else if (id) {
      this.manga = await this.manga_service.getById(id);
    } else {
      this.notFound = true;
    }

    this.title = new FormControl(this.manga.Title || '', [Validators.required]);
    this.englishTitle = new FormControl(this.manga.English || '');
    this.alternateTitles = new FormControl(this.manga.Synonyms.join(', ') || '');
    this.type = new FormControl(this.manga.Type || '', [Validators.required]);
    this.volumes = new FormControl(this.manga.Volumes || -1);
    this.chapters = new FormControl(this.manga.Chapters || -1);
    this.startDate = new FormControl(this.dateObjToString(this.manga.Start));
    this.endDate = new FormControl(this.dateObjToString(this.manga.End));
    this.finished = new FormControl(this.manga.isFinished, [Validators.required]);
    if (!this.manga.Genres || this.manga.Genres.length <= 0) {
      this.genres = new FormControl('', [Validators.required]);
    } else {
      this.genres = new FormControl(this.manga.Genres.join(', '), [Validators.required]);
    }
    this.authors = new FormControl(this.manga.Authors.join('; ') || '');
    this.synopsis = new FormControl(this.manga.Synopsis || '', [Validators.required]);

    this.triedSubmit = false;
    this.hasErrors = true;

    this.form = this.fb.group({
      title: this.title,
      englishTitle: this.englishTitle,
      alternateTitles: this.alternateTitles,
      type: this.type,
      volumes: this.volumes,
      chapters: this.chapters,
      startDate: this.startDate,
      endDate: this.endDate,
      finished: this.finished,
      genres: this.genres,
      authors: this.authors,
      synopsis: this.synopsis,
      email: this.email,
      name: this.name,
      other: this.other,
    });

    this.form.disable();
    this.form.controls['name'].enable();
    this.form.controls['email'].enable();
    this.form.controls['other'].enable();
  }

  dateObjToString(date: Object): string {
    let year = date['year'];
    let month = date['month'];
    let day = date['day'];

    if (parseInt(month) / 10 < 1) {
      month = `0${month}`;
    }
    if (parseInt(day) / 10 < 1) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  }

  enableControl(control: string, id: number): void {
    if (this.type.value == 'One-shot' && control == 'finished') {
      return;
    }

    this.form.controls[control].enable();

    let button = this.el.nativeElement.querySelector(`#editButton_${id}`);
    button.parentNode.removeChild(button);
  }

  onSubmit(): void {
    this.hasErrors = false;

    Object.keys(this.form.controls).forEach((key) => {
      if (this.form.get(key).errors != null) {
        this.triedSubmit = true;
        this.hasErrors = true;
        this.modal.destroy();
        return;
      }
    });

    this.modal.destroy();

    const reportData = `name=${this.form.get('name').value}&email=${this.form.get('email').value}&title=${
      this.form.get('title').value
    }&englishTitle=${this.form.get('englishTitle').value}&alternateTitles=${this.form.get('alternateTitles').value}&type=${
      this.form.get('type').value
    }&volumes=${this.form.get('volumes').value}&chapters=${this.form.get('chapters').value}&startDate=${`${
      this.form.get('startDate').value['month']
    }-${this.form.get('startDate').value['day']}-${this.form.get('startDate').value['year']}`}&endDate=${`${
      this.form.get('endDate').value['month']
    }-${this.form.get('endDate').value['day']}-${this.form.get('endDate').value['year']}`}&finished=${this.form.get('finished').value}&authors=${
      this.form.get('authors').value
    }&genres=${this.form.get('genres').value}&synopsis=${this.form.get('synopsis').value}&other=${this.form.get('other').value}`;

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    if (!this.hasErrors) {
      this.http.post(this.contactUrl, reportData, { headers: headers }).subscribe();
      this.successModal.create();
      location.reload();
    }
  }

  checkOneShot(): void {
    if (this.type.value == 'One-shot') {
      this.form.controls['finished'].setValue(true);
      this.form.controls['finished'].disable();
    } else if (this.form.controls['finished'].disabled && !this.el.nativeElement.querySelector(`#editButton_8`)) {
      this.form.controls['finished'].enable();
    }
  }
}
