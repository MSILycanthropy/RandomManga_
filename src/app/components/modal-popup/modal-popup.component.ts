import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.scss'],
})
export class ModalPopupComponent implements OnInit {
  @Input() width: number;
  @Input() height: number;
  @Input() background: string;
  shown: boolean;
  constructor() {}

  ngOnInit(): void {
    this.destroy();
  }

  create() {
    this.shown = true;
    (document.querySelector('.page-wrap') as HTMLElement).style.cssText += 'overflow:hidden;height:100%';
  }

  destroy() {
    this.shown = false;
    (document.querySelector('.page-wrap') as HTMLElement).style.cssText = '';
  }

  setStyles(): Object {
    return {
      width: this.width + 'px' || 'fit-content',
      height: this.height + 'px' || 'fit-content',
      background: this.background || 'inherit',
    };
  }
}
