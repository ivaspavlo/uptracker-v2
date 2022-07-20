
import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { ILocation } from '@app/interfaces';
import { Observable } from 'rxjs';
import { PREV_BUTTON_PAGES_LIST } from '@app/core/constants/pages-list';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-header-wrapper',
  templateUrl: './header-wrapper.component.html',
  styleUrls: ['./header-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderWrapperComponent implements OnInit {

  @Input() locations: Array<ILocation[]>;
  @Input() currentPage$: Observable<string>;
  @Input() currentLocation: string;
  @Input() avatar: string;
  @Output() logout: EventEmitter<any> = new EventEmitter();
  @Output() locationChange: EventEmitter<string> = new EventEmitter();
  @Output() previousRoute: EventEmitter<void> = new EventEmitter();


  public isPrevButtonVisible$: Observable<boolean>;

  ngOnInit(): void {
    this.isPrevButtonVisible$ = this.currentPage$
      .pipe(map(page => PREV_BUTTON_PAGES_LIST.has(page)));
  }

  public goBack() {
    this.previousRoute.emit();
  }

  public onClickLogout(): void {
    this.logout.emit();
  }

  public onLocationChange(locationId: string): void {
    this.locationChange.emit(locationId);
  }
}
