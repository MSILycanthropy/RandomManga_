import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestMangaComponent } from './request-manga.component';

describe('RequestMangaComponent', () => {
  let component: RequestMangaComponent;
  let fixture: ComponentFixture<RequestMangaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestMangaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestMangaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
