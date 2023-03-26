import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategoryModalComponent } from './edit-category-modal.component';

describe('EditCategoryModalComponent', () => {
  let component: EditCategoryModalComponent;
  let fixture: ComponentFixture<EditCategoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCategoryModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
