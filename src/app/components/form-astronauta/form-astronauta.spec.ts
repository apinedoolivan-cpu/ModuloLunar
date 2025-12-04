import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAstronautaComponent } from './form-astronauta';

describe('FormAstronauta', () => {
  let component: FormularioAstronautaComponent;
  let fixture: ComponentFixture<FormularioAstronautaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioAstronautaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioAstronautaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
