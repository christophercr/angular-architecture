import {Component, Renderer2} from '@angular/core';

// services
import {Loader} from '@services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html'
})
export class LoaderComponent {

  constructor(
    private renderer: Renderer2,
    public loader: Loader,
  ) {
    this.loader.renderer = this.renderer;
  }
}
