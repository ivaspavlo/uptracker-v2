import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelSubModalComponent } from './cancel-sub-modal.component';

describe('CancelSubModalComponent', () => {
  let component: CancelSubModalComponent;
  let fixture: ComponentFixture<CancelSubModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelSubModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelSubModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
