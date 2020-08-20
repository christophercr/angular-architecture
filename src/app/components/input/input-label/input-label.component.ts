import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-input-label',
  templateUrl: './input-label.component.html'
})
export class InputLabelComponent {
  @Input() label: string;
  @Input() type: string; // text, email, password,...
  @Input() icon: string;
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
}
