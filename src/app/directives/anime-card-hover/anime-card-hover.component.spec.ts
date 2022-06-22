import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeCardHoverComponent } from './anime-card-hover.component';

describe('AnimeCardHoverComponent', () => {
  let component: AnimeCardHoverComponent;
  let fixture: ComponentFixture<AnimeCardHoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimeCardHoverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeCardHoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
