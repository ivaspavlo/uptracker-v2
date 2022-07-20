
import { Component,  ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ANIMATION_MODEL } from '../../models';
import { INavigation } from '../../interfaces';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.scss'],
  animations: ANIMATION_MODEL,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarNavComponent {

  @Input() navigation: Array<INavigation>;
  @Input() adminNavigation: Array<INavigation>;
  @Input() openClose: string;
  @Output() switch: EventEmitter<void> = new EventEmitter();

  public isOpened(): boolean {
    return this.openClose === 'open';
  }

}
