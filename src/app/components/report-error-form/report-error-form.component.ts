import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IManga } from 'src/app/app.interface';
import { MangaService } from 'src/app/services/manga/manga.service';
import { ReportErrorService } from 'src/app/services/report-error/report-error.service';

@Component({
  selector: 'report-error-form',
  templateUrl: './report-error-form.component.html',
  styleUrls: ['./report-error-form.component.scss'],
})
export class ReportErrorFormComponent implements OnInit {
  form: FormGroup;
  triedSubmit: boolean;
  hasErrors: boolean;
  manga: IManga;
  notFound: boolean;
  constructor(private fb: FormBuilder, private report: ReportErrorService, private router: ActivatedRoute, private manga_service: MangaService) {}

  async ngOnInit(): Promise<void> {
    this.notFound = false;
    let id = this.router.snapshot.queryParamMap.get('id');
    if (this.report.manga) {
      this.manga = this.report.manga;
    } else if (id) {
      console.log(id);

      this.manga = await this.manga_service.getById(id);
    } else {
      this.notFound = true;
    }
    this.triedSubmit = false;
    this.hasErrors = true;
    this.form = this.fb.group({});
  }

  onSubmit(): void {}
}
