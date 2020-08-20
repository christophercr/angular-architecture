import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, Router} from '@angular/router';

// services
import {Session} from '@services/session.service';

@Injectable({
  providedIn: 'root'
})
export class NotConnectedGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private session: Session,
  ) {
  }

  canActivate(): boolean {
    if (this.session.isConnected()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }
}
