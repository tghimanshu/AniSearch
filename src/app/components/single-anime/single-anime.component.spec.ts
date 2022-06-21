import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAnimeComponent } from './single-anime.component';

describe('SingleAnimeComponent', () => {
  let component: SingleAnimeComponent;
  let fixture: ComponentFixture<SingleAnimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleAnimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleAnimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
