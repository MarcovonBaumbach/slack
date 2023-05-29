import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddStatusComponent } from './dialog-add-status.component';

describe('DialogAddStatusComponent', () => {
  let component: DialogAddStatusComponent;
  let fixture: ComponentFixture<DialogAddStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
