import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, Router} from '@angular/router';

// services
import {Session} from '@services/session.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectedGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private session: Session,
  ) {
  }

  canActivate(): boolean {
    if (!this.session.isConnected()) {
      this.router.navigate(['/auth']);
      return false;
    }
    return true;
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }
}
