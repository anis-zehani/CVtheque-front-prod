import { TestBed } from '@angular/core/testing';

import { CandidatsService } from './candidats.service';

describe('CandidatsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CandidatsService = TestBed.get(CandidatsService);
    expect(service).toBeTruthy();
  });
});
