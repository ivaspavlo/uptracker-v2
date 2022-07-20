
import { Injectable, Inject } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { BehaviorSubject, Observable, merge, of } from 'rxjs';
import { filter, pairwise, tap, take } from 'rxjs/operators';
import { BASE_URL } from '@app/shared/constants';
import { WINDOW } from '@app/core/constants/tokens';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private previousUrl: BehaviorSubject<string> = new BehaviorSubject<string>(BASE_URL);
  public previousUrl$: Observable<string> = this.previousUrl.asObservable();

  private currentUrl: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public currentUrl$: Observable<string> = this.currentUrl.asObservable();

  constructor(private router: Router, @Inject(WINDOW) private window: Window) {
    this.listenToRouterEvents();
  }

  private listenToRouterEvents(): void {
    merge<string, any>(
      of(this.window.location.pathname).pipe(
        take(1),
        tap((url: string) => this.currentUrl.next(url))),
      this.router.events
        .pipe(
          filter((evt: any) => evt instanceof RoutesRecognized),
          pairwise(),
          tap((events: RoutesRecognized[]) => {
            this.currentUrl.next(events[1].urlAfterRedirects);
            this.previousUrl.next(events[0].urlAfterRedirects);
          })
        )).subscribe();
  }
}
