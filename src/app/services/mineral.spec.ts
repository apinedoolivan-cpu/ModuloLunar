import { TestBed } from '@angular/core/testing';

import { Mineral } from './mineral';

describe('Mineral', () => {
  let service: Mineral;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mineral);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
