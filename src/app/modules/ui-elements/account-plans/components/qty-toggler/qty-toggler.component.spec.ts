import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QtyTogglerComponent } from './qty-toggler.component';

describe('QtyTogglerComponent', () => {
  let component: QtyTogglerComponent;
  let fixture: ComponentFixture<QtyTogglerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QtyTogglerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QtyTogglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
