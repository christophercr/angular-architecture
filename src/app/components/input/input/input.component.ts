import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ControlContainer, NgForm, NgModel} from '@angular/forms';

// config
import {REGEX} from '@config/regex';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  viewProviders: [{provide: ControlContainer, useExisting: NgForm}],
})
export class InputComponent implements OnInit {
  // avoid ExpressionChangedAfterItHasBeenCheckedError
  @ViewChild('input') input: NgModel = new NgModel(undefined, undefined, undefined, undefined);

  // two way binding of model
  @Output() modelChange: EventEmitter<any> = new EventEmitter();

  @Input() model: any; // value
  @Input() name: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() type: string; // text, email, password,...
  @Input() icon: string;
  @Input() minlength: number = 2;
  @Input() maxlength: number = Infinity;
  @Input() regex: string; // pattern config
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() autocomplete: boolean = true;
  @Input() showErrors: boolean = true; // show errors message

  pattern: RegExp;

  ngOnInit(): void {
    // retrieve pattern from config
    this.pattern = REGEX[this.regex];
  }

  changeModel(event: Event): void {
    this.modelChange.emit(event);
  }
}
