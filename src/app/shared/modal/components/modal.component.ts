import {Component, ComponentFactoryResolver, ElementRef, ViewChild} from '@angular/core';
import {path} from 'ramda';

// services
import {Modal} from '@shared/modal/services/modal.service';

// directives
import {ModalHostDirective} from '@shared/modal/directives/modal-host.directive';

// models
import {ModalParams} from '@shared/modal/entities/modal-params';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent {
  @ViewChild(ModalHostDirective, {static: false}) modalHost: any;
  @ViewChild('scrollRef', {static: false}) scrollRef: ElementRef;
  @ViewChild('contentRef', {static: false}) contentRef: ElementRef;
  topBorder: boolean = false; // used to control bottom border of header
  focusTimeout: any;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    public modal: Modal,
  ) {
    this.modal.show$.subscribe((isOpen) => {
      clearTimeout(this.focusTimeout);
      if (isOpen) {
        if (this.modal.params.component) this.loadComponent(this.modal.params);
        this.focusTimeout = setTimeout(() => this.contentRef.nativeElement.focus(), 0);
      } else {
        this.clearComponent();
      }

      // focus modal when popped to handle keybord events in buttons
      this.modal.contentRef = this.contentRef;
    });
  }

  loadComponent(params: ModalParams): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(params.component);
    this.modalHost.viewContainerRef.clear();
    const componentRef = this.modalHost.viewContainerRef.createComponent(componentFactory);

    // send data to component
    params.data && Object.keys(params.data).forEach((key) => {
      componentRef.instance[key] = params.data[key];
    });

    // scroll modal content to top when loading new component
    this.scrollRef.nativeElement.scrollTop = 0;
  }

  clearComponent(): void {
    this.modalHost.viewContainerRef.clear();
  }

  secondaryAction(): void {
    if (path(['params', 'secondary', 'action'], this.modal)) this.modal.params.secondaryButton.action();

    this.modal.close();
  }
}
