import {ElementRef, Injectable} from '@angular/core';
import {clone} from 'ramda';
import {ReplaySubject, Subject} from 'rxjs';

// models
import {ModalParams} from '@models/modal-params';

@Injectable({
  providedIn: 'root'
})
export class Modal {
  show$: Subject<boolean> = new ReplaySubject();
  params: ModalParams;
  contentRef: ElementRef;
  buttonsHeight: number;

  open(params: ModalParams) {
    this.params = clone(params);
    this.show$.next(true);
  }

  close() {
    this.show$.next(false);
  }
}
