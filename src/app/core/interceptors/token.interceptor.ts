import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AppStorageService } from '@app/core/services';
import { TOKEN_KEY } from '@app/shared/constants';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private storage: AppStorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers;

    if (this.storage.get(TOKEN_KEY)) {
      headers = { setHeaders: { Authorization: 'Bearer ' + this.storage.get(TOKEN_KEY) } };
    }
    return next.handle(request.clone(headers));
  }
}
