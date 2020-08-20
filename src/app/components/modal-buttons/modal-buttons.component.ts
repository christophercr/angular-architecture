import {AfterViewInit, Component, ElementRef, HostBinding, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {prop} from 'ramda';

// services
import {Modal} from '@services/modal.service';

// models
import {PrimaryModalButton, SecondaryModalButton} from '@models/modal-params';

@Component({
  selector: 'app-modal-buttons',
  templateUrl: './modal-buttons.component.html'
})
export class ModalButtonsComponent implements OnInit, OnDestroy, AfterViewInit {
  @HostBinding('class.modal_buttons') block: boolean = true;

  @Input() primaryButton: PrimaryModalButton;
  @Input() secondaryButton: SecondaryModalButton;

  keyboardListener: any[] = [];

  DEFAULT_PRIMARY_BUTTON: PrimaryModalButton = {
    name: 'actions.ok',
    action: () => this.modal.close(),
    keepOpen: false,
    disabled: false,
  };

  DEFAULT_SECONDARY_BUTTON: SecondaryModalButton = {
    name: 'actions.cancel',
    action: () => this.modal.close(),
    hide: false
  };

  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef,
    public modal: Modal
  ) {
  }

  ngOnInit() {
    this.initButtons();
    this.listenKeyboard();

    this.renderer.removeChild(this.elRef.nativeElement.parentElement, this.elRef.nativeElement);
    this.renderer.appendChild(this.modal.contentRef.nativeElement, this.elRef.nativeElement);
  }

  initButtons() {
    // add default secondaryButton only if there is a primaryButton or a specific secondaryButton
    if (prop('action', this.primaryButton) || this.secondaryButton) {
      this.secondaryButton = {...this.DEFAULT_SECONDARY_BUTTON, ...this.secondaryButton};
    }

    this.primaryButton = {...this.DEFAULT_PRIMARY_BUTTON, ...this.primaryButton};
  }

  primaryAction(): void {
    this.primaryButton.action();
    if (!this.primaryButton.keepOpen) this.modal.close();
  }

  listenKeyboard(): void {
    // enter to validate modal
    this.addKeyboardListener(
      'keyup.enter',
      () => {
        // dont validate modal if cursor is in a textarea
        if (document.activeElement.tagName !== 'TEXTAREA' && !this.primaryButton.disabled) {
          this.primaryButton.action();
        }
      }
    );

    // escape to quit modal
    this.addKeyboardListener(
      'keyup.escape',
      () => this.secondaryButton ? this.secondaryButton.action() : this.modal.close()
    );
  }

  private addKeyboardListener(keyup: string, action: any): void {
    this.keyboardListener.push(
      this.renderer.listen(
        this.modal.contentRef.nativeElement,
        keyup,
        () => action()
      )
    );
  }

  ngAfterViewInit() {
    this.handleSizeModal();
  }

  private handleSizeModal() {
    this.renderer.listen(
      window,
      'resize',
      () => this.modal.buttonsHeight = this.elRef.nativeElement.clientHeight);

    setTimeout(() => window.dispatchEvent(new Event('resize')));
  }

  ngOnDestroy() {
    // stop listening to keyboard
    this.keyboardListener.forEach((listener) => listener());
  }
}
