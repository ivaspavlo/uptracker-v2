import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLocationWarningModalComponent } from './add-location-warning-modal.component';

describe('AddLocationWarningModalComponent', () => {
  let component: AddLocationWarningModalComponent;
  let fixture: ComponentFixture<AddLocationWarningModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLocationWarningModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLocationWarningModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
