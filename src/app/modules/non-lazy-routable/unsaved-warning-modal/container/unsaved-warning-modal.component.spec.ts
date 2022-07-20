
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UnsavedWarningModalComponent } from './unsaved-warning-modal.component';

describe('UnsavedWarningModalComponent', () => {
  let component: UnsavedWarningModalComponent;
  let fixture: ComponentFixture<UnsavedWarningModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnsavedWarningModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsavedWarningModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
