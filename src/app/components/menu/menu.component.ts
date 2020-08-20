import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {prop} from 'ramda';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

// models
import {User} from '@models/api/user';
import {MenuItem, SidebarState} from '@models/menu';

// services
import {MenuService} from '@components/menu/menu.service';
import {Session} from '@services/session.service';
import {Sidebar} from '@services/sidebar.service';
import {Storage} from '@services/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit, OnDestroy {
  currentUser: User;
  menuItems: MenuItem[][];
  destroyed$: Subject<boolean> = new Subject();

  // sidebar
  sidebar: SidebarState = {
    isClosed: false,
    width: 0
  };
  lastResizeWidth: number = 0;
  dragging: boolean = false;
  windowResize: any;
  bodyDrag: any;
  sidebarWidth$: Subject<number> = new Subject();
  @ViewChild('sidebarRef', {static: false}) sidebarRef: ElementRef;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private storage: Storage,
    private menuService: MenuService,
    public session: Session,
    public sidebarService: Sidebar,
  ) {
    this.menuItems = this.menuService.getMenuItems();
    this.enableMobileMode();
  }

  ngOnInit() {
    const s = this.sidebar;

    s.isClosed = this.initSidebar();
    s.width = s.isClosed ? this.sidebarService.width.closed : this.sidebarService.width.open;
    this.sidebarWidth$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((width) => {
        s.width = width;
        s.isClosed = width < this.sidebarService.width.open;
        this.sidebarService.sideMobileOpen = this.sidebarService.mobileMode && width > 0;
        this.storage.set('isMenuClosed', s.isClosed);
        if (width >= this.sidebarService.width.open) {
          this.push(width - this.sidebarService.width.open);
          this.resize(this.sidebarService.width.open);
        } else {
          this.push(0);
          this.resize(width);
          if (width < this.sidebarService.width.closed && !this.sidebarService.mobileMode) {
            s.width = this.sidebarService.width.closed;
            this.resize(this.sidebarService.width.closed);
          }
        }
        if (width === 0 && this.sidebarRef) {
          setTimeout(() => this.sidebarRef.nativeElement.scrollTop = 0, 300);
        }
      });

    let resizeTimeout: any;
    this.windowResize = this.renderer.listen(
      window,
      'resize',
      (event: Event) => {
        this.enableMobileMode(event);
        this.renderer.addClass(document.body, 'dragging');
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          this.renderer.removeClass(document.body, 'dragging');
        }, 100);
      }
    );

    this.bodyDrag = this.renderer.listen(
      window.document.body,
      'touchstart',
      (event: TouchEvent) => {
        if (this.sidebarService.mobileMode && !s.isClosed) {
          this.startResize(event);
        }
      }
    );

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd && this.sidebarService.mobileMode) {
        this.changeSidebarWidth(this.sidebarService.width.closed);
      }
    });
  }

  ngOnDestroy() {
    this.resize(0);
    this.destroyed$.next(true);
    this.destroyed$.complete();
    this.windowResize();
    this.bodyDrag();
  }

  initSidebar(): boolean {
    const isMenuClosed: boolean = this.sidebarService.mobileMode || (this.storage.get('isMenuClosed'));

    if (isMenuClosed) {
      this.resize(this.sidebarService.width.closed);
    } else {
      this.resize(this.sidebarService.width.open);
    }

    return isMenuClosed;
  }

  resize(value: number): void {
    this.sidebarService.params = {...this.sidebarService.params, resize: value};
  }

  push(value: number): void {
    this.sidebarService.params = {...this.sidebarService.params, push: value};
  }

  startResize(startEvent: MouseEvent | TouchEvent): void {
    this.sidebarService.noTransition = true;
    startEvent.stopPropagation();
    const sidebarEl = this.sidebarRef.nativeElement as HTMLElement;
    const startX: number = this.sidebarService.getPos(startEvent, 'x');
    const startWidth: number = this.sidebar.width;
    let quickToggle: boolean = true;
    let checkCoords: boolean = true;
    let isScrolling: boolean = false;
    const resizeListeners = [];
    const endListeners = [];
    const velocityTimeout = setTimeout(
      () => quickToggle = false,
      500
    );

    this.sidebarService.moveList.map((eventName) => {
      resizeListeners.push(
        this.renderer.listen(
          'document',
          eventName,
          (moveEvent: MouseEvent | TouchEvent) => {
            this.renderer.addClass(document.body, 'dragging');
            const target = moveEvent.target as HTMLElement;
            if (checkCoords) {
              isScrolling = this.sidebarService.isScrolling(startEvent, moveEvent);
              checkCoords = false;
            }
            if (!this.sidebarService.mobileMode || !sidebarEl.contains(target) || (sidebarEl.contains(target) && !isScrolling)) {
              const moveX: number = this.sidebarService.getPos(moveEvent, 'x');
              const width = startWidth + (moveX - startX);
              this.changeSidebarWidth(width);
              window.dispatchEvent(new Event('resize'));
            }
          }
        )
      );
    });

    this.sidebarService.endList.map((eventName) => {
      endListeners.push(
        this.renderer.listen(
          'document',
          eventName,
          () => {
            this.sidebarService.noTransition = false;
            endDrag();
          }
        )
      );
    });

    const endDrag = () => {
      this.renderer.removeClass(document.body, 'dragging');
      clearTimeout(velocityTimeout);
      if (quickToggle && this.sidebar.width > startWidth && this.sidebar.isClosed) {
        this.toggle();
      } else {
        stickSidebar();
      }
      resizeListeners.map((listener) => listener());
      endListeners.map((listener) => listener());
    };

    const stickSidebar = () => {
      const s = this.sidebar;
      const serviceWidth = this.sidebarService.width;
      const changeWidth = s.width > serviceWidth.closed && s.width !== serviceWidth.open;
      if (changeWidth) {
        if (s.width < serviceWidth.open) {
          this.changeSidebarWidth(serviceWidth.closed);
        } else {
          this.changeSidebarWidth(serviceWidth.open);
        }
        setTimeout(
          () => window.dispatchEvent(new Event('resize')),
          400
        );
      } else {
        if (s.width < 0) {
          this.changeSidebarWidth(serviceWidth.closed);
        }
      }
    };
  }

  changeSidebarWidth(width: number): void {
    this.sidebarWidth$.next(width);
  }

  toggle(event?: Event): void {
    if (event) event.stopPropagation();
    this.sidebarService.noTransition = false;
    if (this.sidebar.width < this.sidebarService.width.open) {
      this.changeSidebarWidth(this.sidebarService.width.open);
    } else {
      this.changeSidebarWidth(this.sidebarService.width.closed);
    }
  }

  enableMobileMode(event?: Event): void {
    const windowWidth = this.sidebarService.getWindowEventWidth(event);
    this.sidebarService.enableMobileMode(windowWidth);
    this.handleManualResize(event, windowWidth);
  }

  handleManualResize(event: Event, windowWidth: number): void {
    const isManualResize: boolean = prop('isTrusted', event);
    if (isManualResize) {
      const isWidthIncreasing = windowWidth - this.lastResizeWidth > 0;
      const shouldClose = (!isWidthIncreasing && this.sidebarService.mobileMode) || this.sidebar.isClosed;

      this.changeSidebarWidth(shouldClose ? this.sidebarService.width.closed : this.sidebarService.width.open);
      this.lastResizeWidth = windowWidth;
    }
  }

  restrict(value: number): number {
    return Math.min(Math.max(value, 0), window.innerHeight);
  }

  startClickHandle(event: MouseEvent | TouchEvent): void {
    this.startResize(event);
    if (this.sidebarService.mobileMode && !this.sidebar.isClosed) {
      let isClickByTime: boolean = true;
      let isClickByCoords: boolean = true;
      const coords: { x: number, y: number } = {
        x: this.sidebarService.getPos(event, 'x'),
        y: this.sidebarService.getPos(event, 'y')
      };
      const endListeners = [];
      const handleClickTimeout = setTimeout(
        () => {
          isClickByTime = false;
          endListeners.map((listener) => listener());
        },
        300
      );

      this.sidebarService.endList.map((eventName) => {
        endListeners.push(
          this.renderer.listen(
            (event.target as HTMLElement),
            eventName,
            (endEvent: MouseEvent | TouchEvent) => {
              clearTimeout(handleClickTimeout);
              isClickByCoords = Math.abs(this.sidebarService.getPos(endEvent, 'x') - coords.x) < 3
                && Math.abs(this.sidebarService.getPos(endEvent, 'y') - coords.y) < 3;

              if (isClickByCoords && isClickByTime) {
                this.toggle();
              }

              endListeners.map((listener) => listener());
            }
          )
        );
      });
    }
  }
}
