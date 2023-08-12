import {Directive, Input} from '@angular/core';
import {FormControlDirective, FormGroupDirective} from '@angular/forms';

@Directive({
  selector: '[appConnectForm]'
})
export class ConnectFormDirective {
  @Input('appConnectForm')
  set data(val: any) {
    console.log(val);
    if (val) {
      this.formControlDirective.form.patchValue(val);
      this.formControlDirective.form.markAsPristine();
    }
  }
  constructor(private formGroupDirective: FormGroupDirective, private formControlDirective: FormControlDirective) {}
}
