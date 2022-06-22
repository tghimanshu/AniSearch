import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentReleaseComponent } from './recent-release.component';

describe('RecentReleaseComponent', () => {
  let component: RecentReleaseComponent;
  let fixture: ComponentFixture<RecentReleaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentReleaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
