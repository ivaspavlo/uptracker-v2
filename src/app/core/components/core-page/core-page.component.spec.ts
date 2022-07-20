import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorePageComponent } from './core-page.component';

describe('CorePageComponent', () => {
  let component: CorePageComponent;
  let fixture: ComponentFixture<CorePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
