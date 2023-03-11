import { TestBed } from '@angular/core/testing';

import { WorkshopEditorService } from './workshop-editor.service';

describe('WorkshopEditorService', () => {
  let service: WorkshopEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkshopEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
