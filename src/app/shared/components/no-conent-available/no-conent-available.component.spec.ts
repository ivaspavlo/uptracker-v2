import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoConentAvailableComponent } from './no-conent-available.component';

describe('NoConentAvailableComponent', () => {
  let component: NoConentAvailableComponent;
  let fixture: ComponentFixture<NoConentAvailableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoConentAvailableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoConentAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
