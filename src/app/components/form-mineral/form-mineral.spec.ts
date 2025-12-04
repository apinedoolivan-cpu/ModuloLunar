import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMineral } from './form-mineral';

describe('FormMineral', () => {
  let component: FormMineral;
  let fixture: ComponentFixture<FormMineral>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormMineral]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormMineral);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
