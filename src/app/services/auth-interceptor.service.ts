import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    request = this.addToken(request);

    return next.handle(request)
  }

  private addToken(request: HttpRequest<any>) {
    return request.clone({
      setHeaders: {
        'x-ctx-organization-id': `38c6047f-d9fd-496b-b4d6-27785499c6d7`,
      }
    });
  }
}