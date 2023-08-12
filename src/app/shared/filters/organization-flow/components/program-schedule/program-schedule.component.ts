import {ChangeDetectionStrategy, Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, UntypedFormControl, UntypedFormGroup, FormGroupDirective, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SubSink} from 'subsink';
import {debounceTime, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '@core/store';
import {selectScheduleSummary} from '@features/seasons/stores/program-schedule/schedule.reducers';
import {
  LoadScheduleSummary,
} from '@features/seasons/stores/program-schedule/schedule.actions';
import {
  IOrganizationFormGroup,
} from '@features/reports/models/core/filters-form-group.model';
import {IGetScheduleSummary, IScheduleSummary} from '@features/seasons/models/program/schedule-summary.model';
import {IProgramSummaryFilter} from '@features/seasons/models/program/program-summary-filter.model';
import {getOrgFiltersValue} from '@shared/filters/organization-flow/utils/get-organization-filter-value';
import {IScheduleSummaryFilter} from '@features/seasons/models/program/schedule-summary-filter.model';
import {Member} from '@features/organization/enums/member';

@Component({
  selector: 'app-program-schedule',
  templateUrl: './program-schedule.component.html',
  styleUrls: ['./program-schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProgramScheduleComponent),
      multi: true,
    },
  ],
})
export class ProgramScheduleComponent implements OnInit, ControlValueAccessor, OnDestroy {
  @Input() yearView = true;
  formGroup: UntypedFormGroup;
  subs = new SubSink();
  schedule$: Observable<IGetScheduleSummary>;
  scheduleList: IScheduleSummary[] = [];
  copyFilter: IProgramSummaryFilter;

  constructor(private store: Store<AppState>,
              private rootFormGroup: FormGroupDirective) {
    this.schedule$ = store.pipe(select(selectScheduleSummary));
    this.rootValueChanges();
  }

  ngOnInit(): void {
    this.initFromGroup();
    this.initFiltersFirstValue();
    this.subScheduleResponse();
  }

  initFiltersFirstValue(): void {
    const firstValue = {
      businessType: [Member.School, Member.Provider],
      businessId: null,
      seasonId: null,
      programId: null,
      semester: null,
      year: null,
    };
    this.copyFilter = {...firstValue};
  }

  initFromGroup(): void {
    this.formGroup = new UntypedFormGroup({
      scheduleId: new UntypedFormControl(null),
      scheduleLength: new UntypedFormControl(0),
    });

  }

  rootValueChanges(): void {
    this.subs.sink = this.rootFormGroup.valueChanges
      .pipe(debounceTime(600)).subscribe((res: IOrganizationFormGroup) => {
        if (res) {
          this.dispatchSchedule(res);
        }
      });
  }

  dispatchSchedule(organization?: IOrganizationFormGroup): void {
    const orgFilter = getOrgFiltersValue(organization, this.yearView);
    let filter: IScheduleSummaryFilter;
    filter = {
      businessType: orgFilter?.businessType,
      businessId: orgFilter?.businessIds ? orgFilter?.businessIds : null,
      seasonId: orgFilter?.seasonId ? orgFilter.seasonId : null,
      programId: orgFilter?.programId ? orgFilter.programId : null,
      semester: (orgFilter?.semester && orgFilter?.semester !== 'all')
        ? orgFilter.semester : null,
      year: (orgFilter?.year && orgFilter?.year !== 'All')
        ? orgFilter.year : null,
      // programStatus: '', <need>
    };
    if (JSON.stringify(this.copyFilter) !== JSON.stringify(filter)) {
      this.copyFilter = {...filter};
      this.store.dispatch(new LoadScheduleSummary(filter));
    } else {
      return;
    }

  }

  subScheduleResponse(): void {
    this.subs.sink = this.schedule$.subscribe((res: IGetScheduleSummary) => {
      this.scheduleList = [];
      if (res) {
        this.scheduleList = res.result;
        this.setScheduleValue();

      }
    });
  }

  setScheduleValue(): void {
    const scheduleItems = [];
    this.formGroup.get('scheduleLength').patchValue(this.scheduleList?.length);
    this.formGroup.get('scheduleId').patchValue(null);
    this.scheduleList.forEach((schedule: IScheduleSummary) => {
      scheduleItems.push(schedule.id);
    });
    this.formGroup.get('scheduleId').patchValue(scheduleItems);
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
