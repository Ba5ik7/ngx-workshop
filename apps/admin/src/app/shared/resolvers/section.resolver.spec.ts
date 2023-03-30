import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { sectionResolver } from './section.resolver';

describe('sectionResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => sectionResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
