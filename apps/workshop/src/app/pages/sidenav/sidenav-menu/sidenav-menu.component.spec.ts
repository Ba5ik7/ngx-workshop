import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopMenuComponent } from './sidenav-menu.component';

describe('WorkshopMenuComponent', () => {
  let component: WorkshopMenuComponent;
  let fixture: ComponentFixture<WorkshopMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkshopMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
