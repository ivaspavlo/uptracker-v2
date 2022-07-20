
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AppStorageService } from '@app/core/services';
import { TOKEN_KEY, LOGIN_URL } from '@app/shared/constants';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private storage: AppStorageService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggedIn = this.isLoggedIn();
    if (!isLoggedIn) { this.router.navigate([LOGIN_URL]); }
    return isLoggedIn;
  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggedIn = this.isLoggedIn();
    if (!isLoggedIn) { this.router.navigate([LOGIN_URL]); }
    return isLoggedIn;
  }

  private isLoggedIn(): boolean {
    return !!this.storage.get(TOKEN_KEY);
  }

}
