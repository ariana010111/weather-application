import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {AppState} from '@core/store';
import {Observable} from 'rxjs';
import {IStaff} from '@features/staff/models/staff.model';
import {IExporter} from '@core/models/exporter.model';
import {selectStaffList} from '@features/staff/stores/staff/staff.reducers';
import {LoadStaff} from '@features/staff/stores/staff/staff.actions';
import {LoadExporter, LoadShareReporter} from '@features/reports/stores/exporter/exporter.actions';
import {selectReportId} from '@features/reports/stores/exporter/exporter.reducers';
import {IShareReport} from '@shared/share-report/models/share-report.model';
import {SubSink} from 'subsink';

@Component({
  selector: 'app-share-report',
  templateUrl: './share-report.component.html',
  styleUrls: ['./share-report.component.scss']
})
export class ShareReportComponent implements OnInit, OnChanges, OnDestroy {
  @Input() exporterModel?: IExporter;
  @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  formGroup: UntypedFormGroup;
  staff$: Observable<IStaff[]>;
  exporterId$: Observable<string>;
  sub = new SubSink();

  constructor(private store: Store<AppState>) {
    this.staff$ = store.pipe(select(selectStaffList));
    this.exporterId$ = store.pipe(select(selectReportId));

  }

  ngOnChanges(): void {
    if (this.exporterModel) {
      this.store.dispatch(new LoadExporter(this.exporterModel));
    }
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadStaff());
    this.addFormControls();
  }

  addFormControls(): void {
    this.formGroup = new UntypedFormGroup({
      to: new UntypedFormControl(null, Validators.required),
      subject: new UntypedFormControl(null),
      massage: new UntypedFormControl(null),
    });
  }


  sendReport(): void {
    if (this.formGroup.valid) {
      this.sub.sink = this.exporterId$.subscribe((res: string) => {
        if (res) {
          const shareReport = this.addShareData(res);
          this.store.dispatch(new LoadShareReporter(shareReport));
        }
      });
    }

  }

  addShareData(reportId: string): IShareReport {
    const formData = this.formGroup.getRawValue();
    return {
      report_id: reportId,
      subject: formData.subject,
      message: formData.message,
      email: formData.email,
    };
  }

  cancelShare(): void {
    this.cancel.emit(true);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


}
