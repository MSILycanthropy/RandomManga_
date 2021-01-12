import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'request-manga',
  templateUrl: './request-manga.component.html',
  styleUrls: ['./request-manga.component.scss'],
})
export class RequestMangaComponent implements OnInit {
  form: FormGroup;
  contactUrl: string;
  triedSubmit: boolean;
  hasErrors: boolean;

  title = new FormControl('', [Validators.required]);
  englishTitle = new FormControl('');
  alternateTitles = new FormControl('');
  type = new FormControl('', [Validators.required]);
  authors = new FormControl('', [Validators.required]);
  volumes = new FormControl('');
  chapters = new FormControl('');
  startDate = new FormControl('');
  endDate = new FormControl('');
  finished = new FormControl('', [Validators.required]);
  genres = new FormControl('', [Validators.required]);
  synopsis = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);
  other = new FormControl('');
  email = new FormControl('', [Validators.required, Validators.email]);
  mangaTypes: Array<string> = ['Manga', 'Manhwa', 'Manhua', 'One-shot', 'Doujinshi', 'Novel'];

  @ViewChild('modal') modal;
  @ViewChild('successModal') successModal;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.contactUrl = `${environment.apiUrl}/contact/request-manga`;

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
    }&genres=${this.form.get('genres').value}&synopsis=${this.form.get('synopsis').value}`;

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    if (!this.hasErrors) {
      this.http.post(this.contactUrl, reportData, { headers: headers }).subscribe();
      this.successModal.create();
      location.reload();
    }
  }
}
