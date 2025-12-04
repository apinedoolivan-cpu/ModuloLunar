import { TestBed } from '@angular/core/testing';

import { MineralValidationService } from './mineral-form';

describe('MineralForm', () => {
  let service: MineralValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MineralValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
