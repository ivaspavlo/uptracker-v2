
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-auth-container',
  templateUrl: './auth-container.component.html',
  styleUrls: ['./auth-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthContainerComponent implements OnInit {

  public currenUrl$: Observable<any>;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.initCurrentUrlObservable();
  }

  private initCurrentUrlObservable(): void {
    this.currenUrl$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((navEvent: NavigationEnd) => navEvent.url),
      startWith(this.router.url),
      map((url: string) => url.includes('/reset') ? null : url.split('/').pop())
    );
  }

}
