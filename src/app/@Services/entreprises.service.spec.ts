import { TestBed } from '@angular/core/testing';

import { EntreprisesService } from './entreprises.service';

describe('EntreprisesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntreprisesService = TestBed.get(EntreprisesService);
    expect(service).toBeTruthy();
  });
});
