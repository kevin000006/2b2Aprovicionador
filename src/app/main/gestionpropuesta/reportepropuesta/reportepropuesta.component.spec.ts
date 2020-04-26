import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportepropuestaComponent } from './reportepropuesta.component';

describe('ReportepropuestaComponent', () => {
  let component: ReportepropuestaComponent;
  let fixture: ComponentFixture<ReportepropuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportepropuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportepropuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
