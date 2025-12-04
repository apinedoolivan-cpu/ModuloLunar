import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FondoEstrellas } from './fondo-estrellas';

describe('FondoEstrellas', () => {
  let component: FondoEstrellas;
  let fixture: ComponentFixture<FondoEstrellas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FondoEstrellas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FondoEstrellas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
