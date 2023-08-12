import {ChangeDetectionStrategy, Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, UntypedFormControl, UntypedFormGroup, FormGroupDirective, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SubSink} from 'subsink';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '@core/store';
import {ISeasonSummary} from '@features/seasons/models/season/get-season.model';
import {LoadSeasonSummary} from '@features/seasons/stores/season/season.actions';
import {IBusinessControl} from '@shared/filters/organization-flow/models/form-group.model';
import {setBusinessTypeFilter} from '@shared/filters/organization-flow/utils/set-business-type-filter';
import {ISeason} from '@features/reports/models/core/season.model';
import {selectSeasonSummary} from '@features/seasons/stores/season/season.reducers';
import {IGetSeasonSummaryFilter} from '@features/seasons/models/season/get-season-request.model';
import {SeasonStatus} from '@features/seasons/enums/season-status';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SeasonComponent),
      multi: true,
    },
  ],
})
export class SeasonComponent implements OnInit, ControlValueAccessor, OnDestroy {
  seasonList: ISeasonSummary[] = [];
  formGroup: UntypedFormGroup;
  subs = new SubSink();
  season$: Observable<ISeasonSummary[]>;

  constructor(private store: Store<AppState>,
              private rootFormGroup: FormGroupDirective) {
    this.season$ = store.pipe(select(selectSeasonSummary));
    this.initFromGroup();
  }

  ngOnInit(): void {
    this.rootValueChanges();
    this.subSeasonResponse();
  }


  initFromGroup(): void {
    this.formGroup = new UntypedFormGroup({
      seasonId: new UntypedFormControl([]),
      seasonLength: new UntypedFormControl(0),
    });

  }


  rootValueChanges(): void {
    const form = this.rootFormGroup.control.get('business') as UntypedFormControl;
    this.subs.sink = form.valueChanges.subscribe((res: IBusinessControl) => {
      if (res) {
        this.dispatchSeason(res);
      }

    });
  }

  dispatchSeason(businessControl?: IBusinessControl): void {
    const filter: IGetSeasonSummaryFilter = {
      businessType: setBusinessTypeFilter(businessControl),
      businessId: businessControl?.businessId ? businessControl.businessId : null,
      status: SeasonStatus.active,
    };
    this.store.dispatch(new LoadSeasonSummary(filter));
  }

  subSeasonResponse(): void {
    this.subs.sink = this.season$.subscribe((res: ISeasonSummary[]) => {
      this.seasonList = [];
      if (res) {
        this.seasonList = res;
        this.setSeasonValue();

      }
    });
  }

  setSeasonValue(): void {
    const seasonId = [];
    this.formGroup.get('seasonId').patchValue([]);
    this.formGroup.get('seasonLength').patchValue(this.seasonList?.length);
    this.seasonList.forEach((season: ISeason) => {
      seasonId.push(season.id);
    });
    this.formGroup.get('seasonId').patchValue(seasonId);
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
    if (obj?.seasonId?.length === 0 && this.seasonList?.length) {
      this.setSeasonValue();
    }
  }


  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }


}
