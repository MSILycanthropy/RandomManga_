import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss'],
})
export class FeedbackFormComponent implements OnInit {
  contactUrl: string;
  form: FormGroup;

  constructor(private http: HttpClient, public fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactUrl = `${environment.apiUrl}/contact`;
    this.form = this.fb.group({
      name: '',
      email: '',
      message: '',
    });
  }

  onSubmit(): void {
    let feedbackData = `name=${this.form.get('name').value}&email=${this.form.get('email').value}&message=${this.form.get('message').value}`;

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    this.http.post(this.contactUrl, feedbackData, { headers: headers }).subscribe((res) => {
      console.log(res);
    });
  }
}
