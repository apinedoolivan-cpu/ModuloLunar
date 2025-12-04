import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoMineral } from './resultado-mineral';

describe('ResultadoMineral', () => {
  let component: ResultadoMineral;
  let fixture: ComponentFixture<ResultadoMineral>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultadoMineral]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadoMineral);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
