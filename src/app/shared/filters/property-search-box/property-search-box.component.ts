import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, UntypedFormControl, UntypedFormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SubSink} from 'subsink';
import {IPropertyOption} from '@core/models/property-option.model';
import {debounceTime, distinctUntilChanged} from 'rxjs';

@Component({
  selector: 'app-property-search-box',
  templateUrl: './property-search-box.component.html',
  styleUrls: ['./property-search-box.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PropertySearchBoxComponent),
      multi: true,
    },
  ],
})
export class PropertySearchBoxComponent implements OnInit, ControlValueAccessor, OnDestroy {
  formGroup: UntypedFormGroup;
  subs = new SubSink();
  @Input() propertyOption?: IPropertyOption[];

  constructor() {

  }

  ngOnInit(): void {
    this.initializationFromGroup();
  }

  initializationFromGroup(): void {
    this.formGroup = new UntypedFormGroup({
      property: new UntypedFormControl(this.propertyOption[0].value),
      term: new UntypedFormControl(null),
      doSearch: new UntypedFormControl(false),

    });

  }


  registerOnChange(fn: (x: any) => void): void {
    this.subs.sink = this.formGroup
      .valueChanges.pipe(
      debounceTime(3000),
      distinctUntilChanged(),
    )
      .subscribe(fn);

  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
    if (obj) {
      this.formGroup.patchValue(obj, {emitEvent: false});
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  pressEnter(): void {
    // this.formGroup.get('term').
    // this.store.dispatch(new CheckPressEnter(true));
  }
}
