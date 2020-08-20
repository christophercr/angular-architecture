import {Component} from '@angular/core';

import {environment} from '@environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  appName: string = environment.appName;
}
