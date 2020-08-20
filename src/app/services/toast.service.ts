import {Inject, Injectable, Injector, NgZone} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Overlay, TOAST_CONFIG, ToastToken, ToastrService} from 'ngx-toastr';

// services
import {Translate} from '@services/translate.service';

@Injectable({
  providedIn: 'root'
})
export class Toast extends ToastrService {

  constructor(
    @Inject(TOAST_CONFIG) token: ToastToken,
    overlay: Overlay,
    _injector: Injector,
    sanitizer: DomSanitizer,
    ngZone: NgZone,
    private translate: Translate
  ) {
    super(token, overlay, _injector, sanitizer, ngZone);
  }

  show(key: string, params?: any) {
    return super.show(this.translate.instant(key, params));
  }

  success(key: string, params?: any) {
    return super.success(this.translate.instant(key, params));
  }

  error(key: string, params?: any) {
    return super.error(this.translate.instant(key, params));
  }

  info(key: string, params?: any) {
    return super.info(this.translate.instant(key, params));
  }

  warning(key: string, params?: any) {
    return super.warning(this.translate.instant(key, params));
  }
}
