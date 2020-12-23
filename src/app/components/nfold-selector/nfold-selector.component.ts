import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'nfold-selector',
  templateUrl: './nfold-selector.component.html',
  styleUrls: ['./nfold-selector.component.scss'],
})
export class NfoldSelectorComponent implements OnInit {
  @Input() selectableValues: Array<any>;
  @Input() defaultValue: any;
  @Output() toggleEvent = new EventEmitter();

  showExtraClass = true;
  constructor() {}

  ngOnInit(): void {}

  onChange(value): void {
    this.toggleEvent.emit(value.index);
  }
}
