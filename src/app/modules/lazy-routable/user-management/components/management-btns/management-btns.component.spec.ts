import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementBtnsComponent } from './management-btns.component';

describe('ManagementBtnsComponent', () => {
  let component: ManagementBtnsComponent;
  let fixture: ComponentFixture<ManagementBtnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementBtnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementBtnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
