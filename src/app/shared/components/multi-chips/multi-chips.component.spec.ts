import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiChipsComponent } from './multi-chips.component';

describe('MultiChipsComponent', () => {
  let component: MultiChipsComponent;
  let fixture: ComponentFixture<MultiChipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiChipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
