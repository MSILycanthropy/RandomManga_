import { Injectable } from '@angular/core';
import { IManga } from 'src/app/app.interface';

@Injectable({
  providedIn: 'root',
})
export class ReportErrorService {
  manga: IManga;
  constructor() {}
}
