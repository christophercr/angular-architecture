import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Loader} from '@shared/loader/services/loader.service';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(
    private loader: Loader
  ) {
  }

  // intercept request and show loader
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loader.show();
    return next.handle(request).pipe(
      finalize(() => this.loader.hide())
    );
  }
}
