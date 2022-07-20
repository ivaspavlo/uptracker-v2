import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingLocationsComponent } from './onboarding-locations.component';

describe('OnboardingLocationsComponent', () => {
  let component: OnboardingLocationsComponent;
  let fixture: ComponentFixture<OnboardingLocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardingLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
