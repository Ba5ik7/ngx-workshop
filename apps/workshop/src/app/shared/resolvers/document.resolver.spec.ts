import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { documentResolver } from './document.resolver';

describe('workshopResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => documentResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
