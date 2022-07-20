
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-view-header',
  templateUrl: './view-header.component.html',
  styleUrls: ['./view-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewHeaderComponent {

  @Input() title: string;
  @Input() subtitle: string;
  @Input() largePadding = true;

}
