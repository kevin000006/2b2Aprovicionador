import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantaExternaComponent } from './planta-externa.component';

describe('PlantaExternaComponent', () => {
  let component: PlantaExternaComponent;
  let fixture: ComponentFixture<PlantaExternaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantaExternaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantaExternaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
