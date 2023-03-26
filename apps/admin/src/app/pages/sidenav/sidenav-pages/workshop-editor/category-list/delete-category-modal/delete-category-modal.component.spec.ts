import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCategoryModalComponent } from './delete-category-modal.component';

describe('DeleteCategoryModalComponent', () => {
  let component: DeleteCategoryModalComponent;
  let fixture: ComponentFixture<DeleteCategoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCategoryModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
