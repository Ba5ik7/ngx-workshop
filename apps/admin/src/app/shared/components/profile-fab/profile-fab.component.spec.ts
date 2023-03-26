import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFabComponent } from './profile-fab.component';

describe('ProfileFabComponent', () => {
  let component: ProfileFabComponent;
  let fixture: ComponentFixture<ProfileFabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileFabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileFabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
