import { TestBed } from '@angular/core/testing';

import { Mision } from './mision';

describe('Mision', () => {
  let service: Mision;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mision);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
