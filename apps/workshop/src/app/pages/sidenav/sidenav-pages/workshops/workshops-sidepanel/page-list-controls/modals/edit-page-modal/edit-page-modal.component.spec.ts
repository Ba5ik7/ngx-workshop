import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPageModalComponent } from './edit-page-modal.component';

describe('EditPageModalComponent', () => {
  let component: EditPageModalComponent;
  let fixture: ComponentFixture<EditPageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPageModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
