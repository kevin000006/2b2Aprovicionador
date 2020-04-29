import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertaGastosComponent } from './oferta-gastos.component';

describe('OfertaGastosComponent', () => {
  let component: OfertaGastosComponent;
  let fixture: ComponentFixture<OfertaGastosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfertaGastosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertaGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
