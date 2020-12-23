import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NfoldSelectorComponent } from './nfold-selector.component';

describe('NfoldSelectorComponent', () => {
  let component: NfoldSelectorComponent;
  let fixture: ComponentFixture<NfoldSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NfoldSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NfoldSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
