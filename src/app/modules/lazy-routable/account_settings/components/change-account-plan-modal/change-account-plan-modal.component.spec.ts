import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAccountPlanModalComponent } from './change-account-plan-modal.component';

describe('ChangeAccountPlanModalComponent', () => {
  let component: ChangeAccountPlanModalComponent;
  let fixture: ComponentFixture<ChangeAccountPlanModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeAccountPlanModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeAccountPlanModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
