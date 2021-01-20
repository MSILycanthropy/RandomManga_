import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faCheck, faTimes, faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
})
export class DynamicTableComponent implements OnInit {
  @Input() toDisplay: Array<any>;
  toggle: Array<number> = Array<number>(100);

  @Output() sendToggle = new EventEmitter();
  columns: number;
  faCheck = faCheck;
  faTimes = faTimes;
  faMinus = faMinus;

  constructor() {}

  ngOnInit(): void {
    if (window.innerWidth >= 1024) {
      this.columns = 3;
    } else if (window.innerWidth < 1024 && window.innerWidth > 500) {
      this.columns = 3;
    } else {
      this.columns = 2;
    }
    for (let i = 0; i < this.toggle.length; i++) {
      this.toggle[i] = 0;
    }
  }

  toggleOne(i: any): void {
    if (this.toggle.length > this.toDisplay.length) {
      this.toggle = this.toggle.slice(0, this.toDisplay.length);
    }

    // 1: include -1: exclude 0: neither :)
    switch (this.toggle[i]) {
      case 1:
        this.toggle[i] = -1;
        break;
      case -1:
        this.toggle[i] = 0;
        break;
      case 0:
        this.toggle[i] = 1;
        break;
      default:
        console.error('Somehow you got none of the toggleable states, so good job?');
    }

    this.sendToggle.emit(this.toggle);
  }

  toggleAll(i: number): void {
    if (this.toggle.length > this.toDisplay.length) {
      this.toggle = this.toggle.slice(0, this.toDisplay.length);
    }

    if (i != -1 && i != 0 && i != 1) {
      console.error('toggleAll only accepts -1,0 or 1');
    }
    this.toggle = this.toggle.map((val) => (val = i));

    this.sendToggle.emit(this.toggle);
  }
}
