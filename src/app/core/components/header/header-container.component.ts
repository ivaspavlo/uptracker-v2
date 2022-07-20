
import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { ILocation } from '@app/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header-container.component.html',
  styleUrls: ['./header-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderContainerComponent {

  @Input() locations: ILocation[] = [];
  @Input() currentPage$: Observable<string>;
  @Input() currentLocation: string;
  @Input() avatar: string;
  @Output() changeLocation: EventEmitter<string> = new EventEmitter();
  @Output() previousPage: EventEmitter<void> = new EventEmitter();
  @Output() logOut: EventEmitter<void> = new EventEmitter();

  public onLogout(): void {
    this.logOut.emit();
  }

  public onPreviousButtonClick(): void {
    this.previousPage.emit();
  }

  public onLocationChange(currLocation: string): void {
    this.changeLocation.emit(currLocation);
  }

}
