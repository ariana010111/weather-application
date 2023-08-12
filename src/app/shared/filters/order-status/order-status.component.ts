import {Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, UntypedFormControl, UntypedFormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {OrderStatus, translatedOrderStatus} from '@features/reports/enums/mock-enums/order-status';
import {SubSink} from 'subsink';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OrderStatusComponent),
      multi: true,
    },
  ],
})
export class OrderStatusComponent implements OnInit, ControlValueAccessor, OnDestroy {
  formGroup: UntypedFormGroup;
  statusList = translatedOrderStatus;
  subs = new SubSink();

  constructor() {
  }

  ngOnInit(): void {
    this.initializationFromGroup();
  }

  initializationFromGroup(): void {
    this.formGroup = new UntypedFormGroup({
      status: new UntypedFormControl([
        OrderStatus.active,
        OrderStatus.transferred_out,
        OrderStatus.transferred_in,
        OrderStatus.canceled]),
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
