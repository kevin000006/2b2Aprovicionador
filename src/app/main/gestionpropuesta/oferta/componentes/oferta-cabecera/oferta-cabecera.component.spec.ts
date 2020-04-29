import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertaCabeceraComponent } from './oferta-cabecera.component';

describe('OfertaCabeceraComponent', () => {
  let component: OfertaCabeceraComponent;
  let fixture: ComponentFixture<OfertaCabeceraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfertaCabeceraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertaCabeceraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
