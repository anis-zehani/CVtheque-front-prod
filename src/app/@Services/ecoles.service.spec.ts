import { TestBed } from '@angular/core/testing';

import { EcolesService } from './ecoles.service';

describe('EcolesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EcolesService = TestBed.get(EcolesService);
    expect(service).toBeTruthy();
  });
});
