import { TestBed } from '@angular/core/testing';

import { RappelsService } from './rappels.service';

describe('RappelsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RappelsService = TestBed.get(RappelsService);
    expect(service).toBeTruthy();
  });
});
