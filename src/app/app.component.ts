
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { registerCustomMaterialIcons } from '@app/shared/helpers';
import { STRIPE_KEY } from '@env/environment';
import { UserService, UrlService } from '@app/core/services';
import { Router } from '@angular/router';
import { BASE_URL } from '@app/shared/constants';
import { Subject } from 'rxjs';
import { takeUntil, map, filter } from 'rxjs/operators';
import { REDIRECT_IF_LOGGED_PAGES_LIST } from '@app/core/constants';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private userService: UserService,
    private urlService: UrlService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.redirectIfLogged();
    registerCustomMaterialIcons(this.matIconRegistry, this.domSanitizer);
    Stripe.setPublishableKey(STRIPE_KEY);
  }

  private redirectIfLogged() {
    this.urlService.currentUrl$.pipe(
      takeUntil(this.destroy$),
      map((url: string) => url.split('/')[1]),
      filter((url: string) => REDIRECT_IF_LOGGED_PAGES_LIST.has(url) && this.userService.isCredentialsInStorage()))
      .subscribe(_ => this.router.navigateByUrl(BASE_URL));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
