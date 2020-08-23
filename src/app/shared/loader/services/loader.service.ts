import {Injectable, Renderer2} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Loader {
  renderer: Renderer2;
  isShown: boolean = false;
  queue: boolean[] = [];

  show(): void {
    this.isShown = true;
    this.queue.push(true);
    if (this.renderer) this.renderer.addClass(document.body, 'loading');
  }

  hide(): void {
    this.queue.splice(0, 1);

    if (!this.queue.length) {
      this.isShown = false;
      if (this.renderer) this.renderer.removeClass(document.body, 'loading');
    }
  }
}
