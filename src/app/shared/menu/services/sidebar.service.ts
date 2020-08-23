import {Injectable} from '@angular/core';
import {pathOr, prop} from 'ramda';

// models
import {SidebarParams} from '@shared/menu/entities/sidebar';

@Injectable({
  providedIn: 'root'
})
export class Sidebar {
  mobileBreakpoint = 800;
  headerHeight: 40;
  initialSideWidth: any = {open: 210, closed: 70};

  params: SidebarParams = {resize: 0, push: 0};
  sideMobileOpen: boolean = false;
  width: any = this.initialSideWidth;
  isLoaded: boolean = false;
  mobileMode: boolean = window.innerWidth < this.mobileBreakpoint;
  noTransition: boolean = true;
  gotMenuItems: boolean = false;

  moveList = ['mousemove', 'touchmove'];
  endList = ['mouseup', 'touchend', 'touchcancel'];

  getPos(event: MouseEvent | TouchEvent, attr: string) {
    return pathOr(event[attr], ['touches', 0, 'page' + attr.toUpperCase()], event);
  }

  isScrolling(startEvent: MouseEvent | TouchEvent, moveEvent: MouseEvent | TouchEvent): boolean {
    const firstTouchPos = {x: this.getPos(startEvent, 'x'), y: this.getPos(startEvent, 'y')};
    const moveCoords = {
      x: Math.abs(this.getPos(moveEvent, 'x') - firstTouchPos.x),
      y: Math.abs(this.getPos(moveEvent, 'y') - firstTouchPos.y)
    };
    return moveCoords.y > moveCoords.x;
  }

  enableMobileMode(windowWidth: number): void {
    if (windowWidth < this.mobileBreakpoint) {
      this.mobileMode = true;
      this.width = {...this.width, closed: 0};
    } else {
      this.mobileMode = false;
      this.width = {...this.width, closed: this.initialSideWidth.closed};
    }
  }

  getWindowEventWidth(event?: Event): number {
    if (event) {
      return (prop('target', event) as Window).innerWidth;
    }

    return window.innerWidth;
  }
}
