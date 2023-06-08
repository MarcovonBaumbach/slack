import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditDirectMessageComponent } from './dialog-edit-direct-message.component';

describe('DialogEditDirectMessageComponent', () => {
  let component: DialogEditDirectMessageComponent;
  let fixture: ComponentFixture<DialogEditDirectMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditDirectMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditDirectMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
