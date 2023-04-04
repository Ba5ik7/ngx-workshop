import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { workshopResolver } from './workshop.resolver';

describe('workshopResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => workshopResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
