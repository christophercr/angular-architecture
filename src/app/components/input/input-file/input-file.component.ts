import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ControlContainer, NgForm, NgModel} from '@angular/forms';
import {path} from 'ramda';

// services
import {Toast} from '@services/toast.service';

// configs
import {FILES, MAX_FILE_SIZE} from '@config/files';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  viewProviders: [{provide: ControlContainer, useExisting: NgForm}],
})
export class InputFileComponent implements OnInit {
  // avoid ExpressionChangedAfterItHasBeenCheckedError
  @ViewChild('input') input: NgModel = new NgModel(undefined, undefined, undefined, undefined);

  // two way binding of model
  @Output() modelChange: EventEmitter<any> = new EventEmitter();

  @Input() model: any; // value
  @Input() name: string;
  @Input() label: string;
  @Input() tip: boolean = false;
  @Input() types: string[] = []; // image, doc,...
  @Input() multiple: boolean = false;
  @Input() icon: string;
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() showErrors: boolean = true; // show errors message

  file: any; // file
  extensions: string[] = []; // accepted extensions
  accept: string = ''; // accepted extensions as a string list

  constructor(
    private toast: Toast,
  ) {
  }

  ngOnInit() {
    this.getAcceptedExtensions(this.types);
  }

  private getAcceptedExtensions(types: string[]): void {
    types.forEach((current) => {
      FILES[current] && FILES[current].forEach((extension) => {
        this.extensions.push(extension);
        this.accept += '.' + extension + ',';
      });
    });
  }

  changeModel(event: Event): void {
    let files: File[] = path(['target', 'files'], event);
    // convert in array
    files = [...files];

    // reset model if no file
    if (!files.length) this.modelChange.emit();

    files = files.filter((file) =>
      this.checkExtension(file) &&
      this.checkSize(file)
    );

    this.modelChange.emit(this.multiple ? files : files[0]);
  }

  private checkExtension(file: File): boolean {
    const extension = file.name.split('.').pop();
    if (!this.extensions.includes(extension.toLowerCase())) {
      this.toast.error(`errors.form.extensionNotAllowed`);
      return false;
    }
    return true;
  }

  private checkSize(file: File): boolean {
    if (file.size > MAX_FILE_SIZE) {
      this.toast.error(`errors.form.fileToLarge`);
      return false;
    }
    return true;
  }
}
