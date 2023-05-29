import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddUserHolderComponent } from './dialog-add-user-holder.component';

describe('DialogAddUserHolderComponent', () => {
  let component: DialogAddUserHolderComponent;
  let fixture: ComponentFixture<DialogAddUserHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddUserHolderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddUserHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
