import {ChangeDetectionStrategy, Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, UntypedFormControl, UntypedFormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SubSink} from 'subsink';
import {IGridModel} from '@features/reports/models/core/grid.model';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColumnsComponent),
      multi: true,
    },
  ],
})
export class ColumnsComponent implements OnInit, ControlValueAccessor, OnDestroy {
  subs = new SubSink();
  @Input() columnList: IGridModel[];
  formGroup = new UntypedFormGroup({});

  constructor() {
  }

  ngOnInit(): void {
    this.addControls();
  }

  addControls(): void {
    this.columnList.forEach(
      item => {
        this.formGroup.addControl(item.field, new UntypedFormControl(item.isOptional ? [] : [item.field]));
      }
    );
  }

  registerOnChange(fn: any): void {
    if (fn) {
      this.subs.sink = this.formGroup.valueChanges.subscribe(fn);
    }
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
    if (obj) {
      this.formGroup.setValue(obj, {emitEvent: false});
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
