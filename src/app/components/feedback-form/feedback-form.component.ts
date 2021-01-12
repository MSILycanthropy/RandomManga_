import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss'],
})
export class FeedbackFormComponent implements OnInit {
  contactUrl: string;
  feedbackForm: FormGroup;
  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.email, Validators.required]);
  message = new FormControl('', [Validators.required, Validators.minLength(20)]);
  triedSubmit: boolean;
  hasErrors: boolean;
  feedbackFormSelected: boolean;
  @ViewChild('modal') modal;
  @ViewChild('successModal') successModal;

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.triedSubmit = false;
    this.hasErrors = true;
    this.contactUrl = `${environment.apiUrl}/contact`;
    this.feedbackForm = this.fb.group({
      name: this.name,
      email: this.email,
      message: this.message,
    });
    this.feedbackFormSelected = true;
  }

  onSubmit(): void {
    this.hasErrors = false;

    Object.keys(this.feedbackForm.controls).forEach((key) => {
      if (this.feedbackForm.get(key).errors != null) {
        console.log('HAS ERRORS WEE WOO WEE WOO!!!');

        this.triedSubmit = true;
        this.hasErrors = true;
        this.modal.destroy();
        return;
      }
    });

    this.modal.destroy();

    const feedbackData = `name=${this.feedbackForm.get('name').value}&email=${this.feedbackForm.get('email').value}&message=${
      this.feedbackForm.get('message').value
    }`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    if (!this.hasErrors) {
      this.http.post(this.contactUrl, feedbackData, { headers: headers }).subscribe();
      this.successModal.create();
      location.reload();
    }
  }
}
