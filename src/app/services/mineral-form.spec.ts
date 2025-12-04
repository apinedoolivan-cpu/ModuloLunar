import { TestBed } from '@angular/core/testing';

import { MineralFormService } from './mineral-form';

describe('MineralForm', () => {
  let service: MineralFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MineralFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
