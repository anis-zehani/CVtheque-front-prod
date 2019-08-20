import { TestBed } from '@angular/core/testing';

import { OpportunitesService } from './opportunites.service';

describe('OpportunitesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpportunitesService = TestBed.get(OpportunitesService);
    expect(service).toBeTruthy();
  });
});
