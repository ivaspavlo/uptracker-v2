
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ONBOARDING_URL } from '@app/shared/constants';
import { UserService } from '../services';

@Injectable()
export class OnboardingGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.isOnboarded().pipe(
      tap((isOnboarded: boolean) => { if (!isOnboarded) { this.router.navigateByUrl(ONBOARDING_URL); }})
    );
  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.isOnboarded().pipe(
      tap((isOnboarded: boolean) => { if (!isOnboarded) { this.router.navigateByUrl(ONBOARDING_URL); }})
    );
  }

  private isOnboarded(): Observable<boolean> {
    const onboarding = this.userService.getOnboardingStateFromStorage();
    return of(onboarding ? onboarding.complete : true);
  }

}
