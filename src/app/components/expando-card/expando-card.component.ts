import { Component, OnInit } from '@angular/core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'expando-card',
  templateUrl: './expando-card.component.html',
  styleUrls: ['./expando-card.component.scss'],
})
export class ExpandoCardComponent implements OnInit {
  showExpandedContent: boolean;
  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;
  isOverflowing: boolean;

  @ViewChild('expandoContent') expandoContent: any;

  constructor() {}

  ngOnInit(): void {}
}
