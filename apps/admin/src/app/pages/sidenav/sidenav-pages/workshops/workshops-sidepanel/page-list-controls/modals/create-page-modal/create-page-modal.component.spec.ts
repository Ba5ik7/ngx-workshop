import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePageModalComponent } from './create-page-modal.component';

describe('CreatePageModalComponent', () => {
  let component: CreatePageModalComponent;
  let fixture: ComponentFixture<CreatePageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePageModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
