import {Location} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';

// services
import {Connectivity} from '@services/connectivity.service';
import {Session} from '@services/session.service';
import {Toast} from '@services/toast.service';

// services
import {Translate} from '@services/translate.service';

// config
import {ERRORS} from '@config/errors';

// models
import {ErrorConfig, ErrorHandling} from '@models/errors-config';

@Injectable({
  providedIn: 'root'
})
export class ErrorsHandler {
  isUnavailable: boolean = false;

  constructor(
    private router: Router,
    private location: Location,
    private session: Session,
    private toast: Toast,
    private connectivity: Connectivity,
    private translate: Translate
  ) {
  }

  handle(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    // tslint:disable:cyclomatic-complexity
    if (!this.connectivity.isOnline) {
      this.handleOfflineError();
    } else if (error.status === 401) {
      this.publish(error.error || 'UNAUTHORIZED');
    } else if (error.status === 403) {
      this.publish('FORBIDDEN');
    } else if (error.status === 404) {
      this.publish('NOT_FOUND');
    } else if (error.status === 413) {
      this.publish('FILE_TOO_LARGE');
    } else if (error.status === 503) {
      this.publish('SERVICE_UNAVAILABLE');
    } else if (Array.isArray(error.error)) {
      error.error.forEach((err) => this.publish(err));
    } else if (error.error) {
      this.publish(error.error);
    } else {
      this.publish('DEFAULT_ERROR');
    }

    return throwError(error);
  }

  // publish toast error and redirect if needed
  private publish(errorKey: string): void {
    const errorConfig = this.findErrorConfig(errorKey);

    switch (errorConfig.action) {
      case ErrorHandling.SHOW_ERROR:
        this.toast.error('errors.back.' + errorConfig.msg);
        break;

      case ErrorHandling.SHOW_ERROR_AND_DISCONNECT:
        this.toast.error('errors.back.' + errorConfig.msg);
        this.session.logout();
        this.router.navigate(['/auth']);
        break;

      case ErrorHandling.SHOW_ERROR_AND_GO_BACK:
        this.toast.error('errors.back.' + errorConfig.msg);
        this.location.back();
        break;

      case ErrorHandling.SHOW_ERROR_AND_GO_TO_UNAIVALABLE_PAGE:
        this.isUnavailable = true;
        break;
    }
  }

  // avoid to add a useless specific error config if action: SHOW_ERROR
  private findErrorConfig(errorKey: string): ErrorConfig {
    if (ERRORS[errorKey]) { // a error config exists
      return ERRORS[errorKey];
    } else if (this.translate.hasTranslation('errors.back.' + errorKey)) { // a translation exists
      return {
        msg: errorKey,
        action: ErrorHandling.SHOW_ERROR
      };
    } else {
      return ERRORS['DEFAULT_ERROR'];
    }
  }

  private handleOfflineError(): void {
    if (this.connectivity.firstCallOffline) {
      this.connectivity.firstCallOffline = false;
      this.publish('OFFLINE');
    } else {
      this.publish('DO_NOTHING');
    }
  }
}
