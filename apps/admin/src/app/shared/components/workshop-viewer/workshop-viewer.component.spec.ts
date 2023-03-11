import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopViewerComponent } from './workshop-viewer.component';

describe('WorkshopViewerComponent', () => {
  let component: WorkshopViewerComponent;
  let fixture: ComponentFixture<WorkshopViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkshopViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
