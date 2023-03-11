import { TestBed } from '@angular/core/testing';

import { WebstorageService } from './webstorage.service';

describe('WebstorageService', () => {
  let service: WebstorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebstorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
