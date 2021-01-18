import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPortionComponent } from './search-portion.component';

describe('SearchPortionComponent', () => {
  let component: SearchPortionComponent;
  let fixture: ComponentFixture<SearchPortionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPortionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPortionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
