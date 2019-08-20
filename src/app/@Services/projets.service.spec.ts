import { TestBed } from '@angular/core/testing';

import { ProjetsService } from './projets.service';

describe('ProjetsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjetsService = TestBed.get(ProjetsService);
    expect(service).toBeTruthy();
  });
});
