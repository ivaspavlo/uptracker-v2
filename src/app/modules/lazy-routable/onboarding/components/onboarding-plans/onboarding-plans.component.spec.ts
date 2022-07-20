import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingPlansComponent } from './onboarding-plans.component';

describe('OnboardingPlansComponent', () => {
  let component: OnboardingPlansComponent;
  let fixture: ComponentFixture<OnboardingPlansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardingPlansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
