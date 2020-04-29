import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertaEquipamientoComponent } from './oferta-equipamiento.component';

describe('OfertaEquipamientoComponent', () => {
  let component: OfertaEquipamientoComponent;
  let fixture: ComponentFixture<OfertaEquipamientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfertaEquipamientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertaEquipamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
