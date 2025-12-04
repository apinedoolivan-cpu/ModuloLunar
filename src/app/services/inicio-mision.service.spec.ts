import { TestBed } from '@angular/core/testing';

import { InicioMisionService } from './inicio-mision.service';

describe('InicioMisionService', () => {
  let service: InicioMisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InicioMisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
