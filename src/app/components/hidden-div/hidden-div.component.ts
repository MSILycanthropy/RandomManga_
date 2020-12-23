import { Component, Input, OnInit } from '@angular/core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import {
  trigger,
  transition,
  animate,
  style,
  state,
} from '@angular/animations';
import { element } from 'protractor';

@Component({
  selector: 'hidden-div',
  templateUrl: './hidden-div.component.html',
  styleUrls: ['./hidden-div.component.scss'],
  animations: [
    trigger('resizeDiv', [
      state(
        'big',
        style({
          overflow: 'hidden',
          width: '60%',
        })
      ),
      state(
        'small',
        style({
          overflow: 'hidden',
          width: '*',
        })
      ),
      transition('big => small', animate('300ms ease-in-out')),
      transition('small => big', animate('300ms ease-in-out')),
    ]),
    trigger('slideInOut', [
      state(
        'out',
        style({
          overflow: 'hidden',
          height: '*',
          width: '*',
        })
      ),
      state(
        'in',
        style({
          opacity: '0',
          overflow: 'hidden',
          height: '0',
          width: '0',
        })
      ),
      transition('out => in', animate('300ms ease-in-out')),
      transition('in => out', animate('300ms ease-in-out')),
    ]),
  ],
})
export class HiddenDivComponent implements OnInit {
  showContent: boolean;
  resizeDiv: boolean;
  faAngleDown = faAngleDown;

  @Input() title: string;

  constructor() {}

  ngOnInit(): void {
    this.resizeDiv = false;
    this.showContent = false;
  }

  toggleShow(event): void {
    var element: HTMLElement = event.target;
    if (element.parentElement.tagName.toLowerCase() == 'svg') {
      element = element.parentElement;
    }

    if (element.id.includes('hiddenDiv')) {
      if (!this.showContent) {
        this.resizeDiv = !this.resizeDiv;
      } else if (this.resizeDiv) {
        this.showContent = !this.showContent;
      }

      return;
    }

    if (element.attributes['data-icon'] != null) {
      if (element.attributes['data-icon'].value == 'angle-down') {
        if (!this.showContent) {
          this.resizeDiv = !this.resizeDiv;
        } else if (this.resizeDiv) {
          this.showContent = !this.showContent;
        }
      }

      return;
    }
  }

  resizeFinished(event: AnimationEvent): void {
    if (this.resizeDiv) {
      this.showContent = !this.showContent;
    }
  }

  slideFinished(event: AnimationEvent) {
    if (!this.showContent && this.resizeDiv) {
      this.resizeDiv = !this.resizeDiv;
    }
  }
}
