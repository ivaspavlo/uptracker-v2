
import { Component, ChangeDetectionStrategy, OnInit, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { selectSidebarCollapsed } from '@app/core/store/selectors/core-page.selector';
import { ICoreModuleState } from '@app/core/store';
import * as corePageActions from '@app/core/store/actions/core-page.actions';

import { PAGES_LIST, ADMIN_PAGES_LIST } from './models';
import { SIDEBAR_STATE } from './constants';
import { INavigation } from './interfaces';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar-container.component.html',
  styleUrls: ['./sidebar-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {

  @Input() set currentPage(page: string) {
    this.pages = this.mapPagesList(PAGES_LIST, page);
    this.adminPages = this.mapPagesList(ADMIN_PAGES_LIST, page);
  }
  public pages: Array<INavigation>;
  public adminPages: Array<INavigation>;
  public collapsedState$: Observable<string>;

  constructor(private store: Store<ICoreModuleState>) { }

  ngOnInit(): void {
    this.initCollapsedStateObservable();
  }

  // PUBLIC METHODS

  public onSwitchSidebar() {
    this.store.dispatch(corePageActions.switchSidebarAction());
  }

  // PRIVATE METHODS

  private mapPagesList(list: Array<INavigation>, route: string): Array<INavigation> {
    return list.map(page => ({ ...page, active: page.route === route }));
  }

  private initCollapsedStateObservable(): void {
    this.collapsedState$ = this.store.pipe(
      select(selectSidebarCollapsed),
      map((isCollapsed: boolean) => isCollapsed ? SIDEBAR_STATE.CLOSED : SIDEBAR_STATE.OPEN)
    );
  }

}
