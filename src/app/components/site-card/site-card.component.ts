import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'site-card',
  templateUrl: './site-card.component.html',
  styleUrls: ['./site-card.component.scss'],
})
export class SiteCardComponent implements OnInit {
  @Input() title: string;
  @Input() color: string;
  @Input() url: string;

  constructor() {}

  ngOnInit(): void {}
}
