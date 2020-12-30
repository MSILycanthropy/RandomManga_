import { Component, OnInit } from '@angular/core';
import {
  faFacebookSquare,
  faTwitterSquare,
  faRedditSquare,
  faTumblrSquare,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.scss'],
})
export class MainFooterComponent implements OnInit {
  faFacebook = faFacebookSquare;
  faTwitter = faTwitterSquare;
  faReddit = faRedditSquare;
  faTumblr = faTumblrSquare;

  constructor() {}

  ngOnInit(): void {}
}
