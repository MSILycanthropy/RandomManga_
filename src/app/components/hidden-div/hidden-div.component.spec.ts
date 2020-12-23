import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiddenDivComponent } from './hidden-div.component';

describe('HiddenDivComponent', () => {
  let component: HiddenDivComponent;
  let fixture: ComponentFixture<HiddenDivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiddenDivComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiddenDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
