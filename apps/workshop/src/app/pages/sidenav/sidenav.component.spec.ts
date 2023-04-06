import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopSidenavComponent } from './workshop-sidenav.component';

describe('WorkshopSidenavComponent', () => {
  let component: WorkshopSidenavComponent;
  let fixture: ComponentFixture<WorkshopSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkshopSidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
