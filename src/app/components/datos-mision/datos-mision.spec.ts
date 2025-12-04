import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosMisionComponent } from './datos-mision';

describe('DatosMision', () => {
  let component: DatosMisionComponent;
  let fixture: ComponentFixture<DatosMisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosMisionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosMisionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
