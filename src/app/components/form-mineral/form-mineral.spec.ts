import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMineralComponent } from './form-mineral';

describe('FormMineral', () => {
  let component: FormMineralComponent;
  let fixture: ComponentFixture<FormMineralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormMineralComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormMineralComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
