import { TestBed } from '@angular/core/testing';

import { AstronautaValidationService } from './form-astronauta';

describe('AstronautaValidationService', () => {
  let service: AstronautaValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AstronautaValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
