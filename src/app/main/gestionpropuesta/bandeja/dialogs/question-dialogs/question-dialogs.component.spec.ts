import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDialogsComponent } from './question-dialogs.component';

describe('QuestionDialogsComponent', () => {
  let component: QuestionDialogsComponent;
  let fixture: ComponentFixture<QuestionDialogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionDialogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
