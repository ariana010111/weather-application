import {ChangeDetectionStrategy, Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, UntypedFormControl, UntypedFormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {translatedStaffStatus} from '@features/reports/enums/staff/staff-status';
import {SubSink} from 'subsink';

@Component({
  selector: 'app-staff-status',
  templateUrl: './staff-status.component.html',
  styleUrls: ['./staff-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StaffStatusComponent),
      multi: true,
    },
  ],
})
export class StaffStatusComponent implements OnInit, ControlValueAccessor, OnDestroy {
  formGroup: UntypedFormGroup;
  statusList = translatedStaffStatus;
  subs = new SubSink();

  constructor() {
  }

  ngOnInit(): void {
    this.initializationFromGroup();
  }

  initializationFromGroup(): void {
    this.formGroup = new UntypedFormGroup({
      status: new UntypedFormControl(this.statusList[0]),
    });

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
