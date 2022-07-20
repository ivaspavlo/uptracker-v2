import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingTeamComponent } from './onboarding-team.component';

describe('OnboardingTeamComponent', () => {
  let component: OnboardingTeamComponent;
  let fixture: ComponentFixture<OnboardingTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardingTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
