import {Injectable} from '@angular/core';
import {ConnectionService} from 'ng-connection-service';
import {distinctUntilChanged} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Connectivity {
  isOnline: boolean = true;
  firstCallOffline: boolean = true; // flag to check the first request offline and don't show multi error message

  constructor(
    private connectionService: ConnectionService,
  ) {
    this.init();
  }

  private init() {
    this.isOnline = navigator.onLine;

    this.connectionService.monitor()
      .pipe(distinctUntilChanged())
      .subscribe((connectionState) => {
        this.isOnline = connectionState.hasNetworkConnection;

        // reset if online
        if (connectionState.hasNetworkConnection) this.firstCallOffline = true;
      });
  }
}
