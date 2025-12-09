import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FondoEstrellasComponent } from './fondo-estrellas';

describe('FondoEstrellas', () => {
  let component: FondoEstrellasComponent;
  let fixture: ComponentFixture<FondoEstrellasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FondoEstrellasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FondoEstrellasComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
