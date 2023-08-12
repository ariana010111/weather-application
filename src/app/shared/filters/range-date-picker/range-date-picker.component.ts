import {ChangeDetectionStrategy, Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {
  ControlValueAccessor,
  UntypedFormControl,
  UntypedFormGroup,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import {SubSink} from 'subsink';
import {DatePipe} from '@angular/common';
import {translatedDefultDate} from '@features/reports/enums/mock-enums/default-date';

@Component({
  selector: 'app-range-date-picker',
  templateUrl: './range-date-picker.component.html',
  styleUrls: ['./range-date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DatePipe,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RangeDatePickerComponent),
      multi: true,
    },
  ],
})
export class RangeDatePickerComponent implements OnInit, ControlValueAccessor, OnDestroy {
  formGroup: UntypedFormGroup;
  defaultDates = translatedDefultDate;
  showCalender = false;
  todayDate = new Date();
  subs = new SubSink();
  @Input() filterLabel: string;

  constructor(private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.formGroup = new UntypedFormGroup({
        regStartDate: new UntypedFormControl(null),
        regEndDate: new UntypedFormControl(null),
        name: new UntypedFormControl(null),
      },
      {
        validators: this.compareRangeDate()
      });
  }

  compareRangeDate(): ValidatorFn | null {
    return (group: UntypedFormGroup): ValidationErrors => {
      const regStartDate = group.get('regStartDate').value;
      const regEndDate = group.get('regEndDate').value;

      if (regEndDate !== null) {
        if (regStartDate <= regEndDate) {
          group.get('regEndDate').setErrors(null);
          return null;
        } else {
          group.get('regEndDate').setErrors({invalidRangeDate: true});
          return {invalidRangeDate: true};
        }
      } else {
        return null;
      }
    };

  }

  registerOnChange(fn: (x: any) => void): void {
    this.formGroup.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: DateFormControl): void {
    if (obj) {
      if (obj.name === 'Custom') {
        this.showCalender = true;
      }
      if (obj?.regStartDate) {
        const startUTCDate = this.datePipe.transform(new Date(obj.regStartDate), 'MM/dd/yyyy').toString();
        obj.regStartDate = startUTCDate;

      }
      if (obj.regEndDate) {
        const endUTCDate = this.datePipe.transform(new Date(obj.regEndDate), 'MM/dd/yyyy').toString();
        obj.regEndDate = endUTCDate;
      }

      this.formGroup.setValue(obj, {emitEvent: false});
    }
  }

  calcDateRange(value: number): void {
    if (value < -1) {
      return;
    }
    this.showCalender = value === -1;
    this.formGroup.get('regEndDate').patchValue(null);
    if (value === 0 || value === -1) {
      this.formGroup.get('regStartDate').patchValue(null);
    } else {
      const currentDate = new Date();
      const fromDate = new Date(currentDate.setMonth(currentDate.getMonth() - value));
      this.formGroup.get('regStartDate').patchValue(fromDate);
    }

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

export class DateFormControl {
  regStartDate: string;
  regEndDate: string;
  name: string;

}
