import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { ViewChild } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

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

  //TODO: Make it so that if there is no extra content that the fuckin thingies dont show
  toggleExpandedContent(): void {
    if (this.isOverflowing) {
      this.showExpandedContent = !this.showExpandedContent;
    }
    if (this.showExpandedContent) {
      this.expandoContent.nativeElement.classList.add('yesWhiteSpace');
    } else {
      this.expandoContent.nativeElement.classList.remove('yesWhiteSpace');
    }
  }

  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.showExpandedContent = false;
    this.isOverflowing = false;
  }

  checkOverflow(): void {
    this.expandoContent.nativeElement.childNodes.forEach((node) => {
      if (node.classList) {
        if (node.offsetWidth < node.scrollWidth || this.showExpandedContent) {
          this.isOverflowing = true;
          this.ref.detectChanges();
        } else {
          this.isOverflowing = false;
          this.showExpandedContent = false;
          this.ref.detectChanges();
        }

        node.classList.add('ellipsis');
      }
    });
  }

  reset(): void {
    if (this.showExpandedContent) {
      this.toggleExpandedContent();
      this.checkOverflow();
    }
  }

  ngAfterViewChecked() {
    this.checkOverflow();
  }
}
