import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoMisionComponent } from './resultado-mision';

describe('ResultadoMision', () => {
  let component: ResultadoMisionComponent;
  let fixture: ComponentFixture<ResultadoMisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultadoMisionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadoMisionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
