import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePageModalComponent } from './delete-page-modal.component';

describe('DeletePageModalComponent', () => {
  let component: DeletePageModalComponent;
  let fixture: ComponentFixture<DeletePageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePageModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
