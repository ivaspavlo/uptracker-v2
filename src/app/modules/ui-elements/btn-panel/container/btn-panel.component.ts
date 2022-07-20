
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-btn-panel',
  templateUrl: './btn-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BtnPanelComponent {

  @Input() set btnNames([ cancelName, confirmName ]: string[]) { this.cancelName = cancelName; this.confirmName = confirmName; }
  @Input() confirmDisabled: boolean;
  @Input() cancelDisabled: boolean;
  @Input() isCancelBold = true;
  @Input() isSpinnerVisible = false;

  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() confirm: EventEmitter<void> = new EventEmitter();

  public cancelName: string;
  public confirmName: string;

}
