
import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-close-modal-btn',
  templateUrl: './close-modal-btn.component.html',
  styleUrls: ['./close-modal-btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CloseModalBtnComponent {

  @Output() closeModal: EventEmitter<void> = new EventEmitter();

}
