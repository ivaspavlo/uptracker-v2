import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLocationModalComponent } from './delete-location-modal.component';

describe('DeleteLocationModalComponent', () => {
  let component: DeleteLocationModalComponent;
  let fixture: ComponentFixture<DeleteLocationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteLocationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteLocationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
