import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSectionModalComponent } from './create-section.component';

describe('CreateSectionModalComponent', () => {
  let component: CreateSectionModalComponent;
  let fixture: ComponentFixture<CreateSectionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSectionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
