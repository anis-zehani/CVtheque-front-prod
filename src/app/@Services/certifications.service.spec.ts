import { TestBed } from '@angular/core/testing';

import { CertificationsService } from './certifications.service';

describe('CertificationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CertificationsService = TestBed.get(CertificationsService);
    expect(service).toBeTruthy();
  });
});
