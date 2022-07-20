
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-modal-header',
  templateUrl: './modal-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalHeaderComponent {

  @Input() public set titles([title, subtitle]: string[]) { this.title = title; this.subtitle = subtitle; }
  public title: string;
  public subtitle: string;

}
