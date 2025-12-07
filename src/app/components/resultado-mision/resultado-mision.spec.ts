import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoMision } from './resultado-mision';

describe('ResultadoMision', () => {
  let component: ResultadoMision;
  let fixture: ComponentFixture<ResultadoMision>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultadoMision]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadoMision);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
