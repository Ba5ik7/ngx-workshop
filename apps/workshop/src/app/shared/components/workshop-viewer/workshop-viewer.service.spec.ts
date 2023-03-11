import { TestBed } from '@angular/core/testing';

import { WorkshopViewerService } from './workshop-viewer.service';

describe('WorkshopViewerService', () => {
  let service: WorkshopViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkshopViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
