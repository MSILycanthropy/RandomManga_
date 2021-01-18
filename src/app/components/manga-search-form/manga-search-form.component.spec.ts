import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaSearchFormComponent } from './manga-search-form.component';

describe('MangaSearchFormComponent', () => {
  let component: MangaSearchFormComponent;
  let fixture: ComponentFixture<MangaSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MangaSearchFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MangaSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
