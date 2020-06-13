import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechazarOfertaComponent } from './rechazar-oferta.component';

describe('RechazarOfertaComponent', () => {
  let component: RechazarOfertaComponent;
  let fixture: ComponentFixture<RechazarOfertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechazarOfertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechazarOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
