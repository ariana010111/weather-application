import {ChangeDetectionStrategy, Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {translatedSeason} from '@shared/filters/season-type/enums/season';
import {ControlValueAccessor, UntypedFormControl, UntypedFormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SubSink} from 'subsink';
import {IPropertyOption} from '@core/models/property-option.model';
import {BehaviorSubject} from 'rxjs';

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
  @Input() index?: number;
  season = translatedSeason;
  formGroup: UntypedFormGroup;
  subs = new SubSink();
  year: IPropertyOption[] = [];
  yearView$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() {
    this.calcLastThreeYears();
  }

  ngOnInit(): void {
    this.initializationFromGroup();
  }

  initializationFromGroup(): void {
    this.formGroup = new UntypedFormGroup({
      program: new UntypedFormControl(this.season[0].value),
      season: new UntypedFormControl(this.season[0].value),
      year: new UntypedFormControl(this.year[0].value),
    });

  }

  calcLastThreeYears(): void {
    const currentYear = new Date().getFullYear();
    const all = {label: 'All', value: (currentYear - (currentYear - 1))};
    const year1 = {label: (currentYear + 1).toString(), value: currentYear + 1};
    const year2 = {label: currentYear.toString(), value: currentYear + 1};
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


  switchView(data: boolean): void {
    this.yearView$.next(data);
  }
}
