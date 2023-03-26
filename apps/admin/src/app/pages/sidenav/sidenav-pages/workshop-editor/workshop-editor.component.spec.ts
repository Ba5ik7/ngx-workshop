import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopEditorComponent } from './workshop-editor.component';

describe('WorkshopEditorComponent', () => {
  let component: WorkshopEditorComponent;
  let fixture: ComponentFixture<WorkshopEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkshopEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
