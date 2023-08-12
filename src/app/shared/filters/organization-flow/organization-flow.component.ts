import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef, Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {ControlValueAccessor, UntypedFormControl, UntypedFormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SubSink} from 'subsink';
import {debounceTime, distinctUntilChanged} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@core/store';
import {IGetMemberRequest} from '@features/organization/models/get-member-request.model';
import {LoadMemberSummary} from '@features/organization/stores/member/member.actions';
import {Member} from '@features/organization/enums/member';
import {LoadProgramSummary} from '@features/seasons/stores/program/program.actions';
import {IGetSeasonRequest} from '@features/seasons/models/season/get-season-request.model';
import {LoadSeasonSummary} from '@features/seasons/stores/season/season.actions';
import {IProgramSummaryFilter} from '@features/seasons/models/program/program-summary-filter.model';
import {LoadScheduleSummary} from '@features/seasons/stores/program-schedule/schedule.actions';


@Component({
  selector: 'app-organization-flow',
  templateUrl: './organization-flow.component.html',
  styleUrls: ['./organization-flow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OrganizationFlowComponent),
      multi: true,
    },
  ],
})
export class OrganizationFlowComponent implements OnInit, ControlValueAccessor, OnDestroy {
  @Input() levelShow: number;
  @Output() emitYearView: EventEmitter<boolean> = new EventEmitter<boolean>();
  formGroup: UntypedFormGroup;
  isYear = true;
  businessType = [Member.School, Member.Provider];
  subs = new SubSink();

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.initFromGroup();
    this.dispatchBusiness();
    if (this.levelShow >= 1) {
      this.dispatchSeason();
    }
    if (this.levelShow >= 2) {
      this.dispatchProgram();
    }
    if (this.levelShow >= 3) {
      this.dispatchSchedule();
    }

  }

  initFromGroup(): void {
    this.formGroup = new UntypedFormGroup({
      business: new UntypedFormControl(null),
      season: new UntypedFormControl([]),
      seasonType: new UntypedFormControl({semester: 'all', year: 'All'}),
      program: new UntypedFormControl(null),
      schedule: new UntypedFormControl(null),
    });

  }


  dispatchBusiness(): void {
    const body: IGetMemberRequest = {
      type: this.businessType,
    };
    this.store.dispatch(new LoadMemberSummary(body));
  }

  dispatchSeason(): void {
    const filter: IGetSeasonRequest = {
      businessType: this.businessType,
    };
    this.store.dispatch(new LoadSeasonSummary(filter));
  }


  dispatchProgram(): void {
    const body: IProgramSummaryFilter = {
      businessType: this.businessType,
    };
    this.store.dispatch(new LoadProgramSummary(body));
  }


  dispatchSchedule(): void {
    const body: IProgramSummaryFilter = {
      businessType: this.businessType,
    };
    this.store.dispatch(new LoadScheduleSummary(body));
  }

  switchView(): void {
    this.isYear = !this.isYear;
    this.emitYearView.emit(  this.isYear);
    if (this.isYear) {
      this.formGroup.get('season').patchValue({seasonId: []});
    } else {
      this.formGroup.get('seasonType').patchValue({semester: 'all', year: 'All'});
    }
  }


  registerOnChange(fn: (x: any) => void): void {
    this.subs.sink = this.formGroup.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(fn);
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
