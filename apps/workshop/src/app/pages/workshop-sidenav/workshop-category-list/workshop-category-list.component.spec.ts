import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopCategoryListComponent } from './workshop-category-list.component';

describe('WorkshopCategoryListComponent', () => {
  let component: WorkshopCategoryListComponent;
  let fixture: ComponentFixture<WorkshopCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkshopCategoryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
