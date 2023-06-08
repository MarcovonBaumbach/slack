import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditAnswerComponent } from './dialog-edit-answer.component';

describe('DialogEditAnswerComponent', () => {
  let component: DialogEditAnswerComponent;
  let fixture: ComponentFixture<DialogEditAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditAnswerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
