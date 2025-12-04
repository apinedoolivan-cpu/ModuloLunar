import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionCriterioComponent } from './seleccion-criterio';

describe('SeleccionCriterio', () => {
  let component: SeleccionCriterioComponent;
  let fixture: ComponentFixture<SeleccionCriterioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionCriterioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionCriterioComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
