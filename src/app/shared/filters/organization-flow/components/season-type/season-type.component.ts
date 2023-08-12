import {ChangeDetectionStrategy, Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, UntypedFormControl, UntypedFormGroup, FormGroupDirective, NG_VALUE_ACCESSOR} from '@angular/forms';
import {translatedSeason} from '@shared/filters/season-type/enums/season';
import {SubSink} from 'subsink';
import {IPropertyOption} from '@core/models/property-option.model';
import {IBusinessControl} from '@shared/filters/organization-flow/models/form-group.model';

@Component({
  selector: 'app-season-type',
  templateUrl: './season-type.component.html',
  styleUrls: ['./season-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SeasonTypeComponent),
      multi: true,
    },
  ],
})
export class SeasonTypeComponent implements OnInit, ControlValueAccessor, OnDestroy {
  season = translatedSeason;
  formGroup: UntypedFormGroup;
  subs = new SubSink();
  year: IPropertyOption[] = [];

  constructor(private rootFormGroup: FormGroupDirective) {
    this.calcLastThreeYears();
    this.initFromGroup();
  }

  ngOnInit(): void {
    this.rootValueChanges();
  }

  initFromGroup(): void {
    this.formGroup = new UntypedFormGroup({
      semester: new UntypedFormControl(this.season[0].value),
      year: new UntypedFormControl('All'),
    });

  }

  rootValueChanges(): void {
    const form = this.rootFormGroup.control.get('business') as UntypedFormControl;
    this.subs.sink = form.valueChanges.subscribe((res: IBusinessControl) => {
      if (res) {
        this.formGroup.setValue({semester: 'all', year: 'All'});
      }

    });
  }

  calcLastThreeYears(): void {
    const currentYear = new Date().getFullYear();
    const all = {label: 'All', value: 'All'};
    const year1 = {label: (currentYear + 1).toString(), value: currentYear + 1};
    const year2 = {label: currentYear.toString(), value: currentYear};
    const year3 = {label: (currentYear - 1).toString(), value: currentYear - 1};
    const year4 = {label: (currentYear - 2).toString(), value: currentYear - 2};
    this.year.push(all);
    this.year.push(year1);
    this.year.push(year2);
    this.year.push(year3);
    this.year.push(year4);
  }

  registerOnChange(fn: (x: any) => void): void {
    this.subs.sink = this.formGroup.valueChanges.subscribe(fn);
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


}
