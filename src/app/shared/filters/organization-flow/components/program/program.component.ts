import {ChangeDetectionStrategy, Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, UntypedFormControl, UntypedFormGroup, FormGroupDirective, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SubSink} from 'subsink';
import {select, Store} from '@ngrx/store';
import {AppState} from '@core/store';
import {LoadProgramSummary} from '@features/seasons/stores/program/program.actions';
import {debounceTime, Observable} from 'rxjs';
import {selectProgramSummary} from '@features/seasons/stores/program/program.reducers';
import {
  IOrganizationFormGroup,
} from '@features/reports/models/core/filters-form-group.model';
import {IGetProgramSummary, IProgramSummary} from '@features/seasons/models/program/program-summary.model';
import {getOrgFiltersValue} from '@shared/filters/organization-flow/utils/get-organization-filter-value';
import {IProgramSummaryFilter} from '@features/seasons/models/program/program-summary-filter.model';
import {Member} from '@features/organization/enums/member';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProgramComponent),
      multi: true,
    },
  ],
})
export class ProgramComponent implements OnInit, ControlValueAccessor, OnDestroy {
  @Input() yearView = true;
  formGroup: UntypedFormGroup;
  subs = new SubSink();
  program$: Observable<IGetProgramSummary>;
  programList: IProgramSummary[] = [];
  copyFilter: IProgramSummaryFilter;

  constructor(private store: Store<AppState>,
              private rootFormGroup: FormGroupDirective,
  ) {
    this.program$ = store.pipe(select(selectProgramSummary));
    this.initFromGroup();
  }

  ngOnInit(): void {
    this.initFiltersFirstValue();
    this.rootValueChanges();
    this.subProgramResponse();
  }

  initFromGroup(): void {
    this.formGroup = new UntypedFormGroup({
      programId: new UntypedFormControl(null),
      programLength: new UntypedFormControl(0),
    });
  }

  initFiltersFirstValue(): void {
    const firstValue = {
      businessType: [Member.School, Member.Provider],
      businessId: null,
      seasonId: null,
      semester: null,
      year: null,
    };
    this.copyFilter = {...firstValue};
  }

  rootValueChanges(): void {
    this.subs.sink = this.rootFormGroup.valueChanges.pipe(debounceTime(400))
      .subscribe((res: IOrganizationFormGroup) => {
        if (res) {
          this.dispatchProgram(res);
        }
      });
  }


  dispatchProgram(organization?: IOrganizationFormGroup): void {
    const orgFilter = getOrgFiltersValue(organization, this.yearView);
    let filter: IProgramSummaryFilter;
    filter = {
      businessType: orgFilter?.businessType,
      businessId: orgFilter?.businessIds ? orgFilter?.businessIds : null,
      seasonId: orgFilter?.seasonId ? orgFilter.seasonId : null,
      semester: (orgFilter?.semester && orgFilter?.semester !== 'all')
        ? orgFilter.semester : null,
      year: (orgFilter?.year && orgFilter?.year !== 'All')
        ? orgFilter.year : null,
    };

    if (JSON.stringify(this.copyFilter) !== JSON.stringify(filter)) {
      this.copyFilter = {...filter};
      this.store.dispatch(new LoadProgramSummary(filter));
    } else {
      return;
    }
  }

  subProgramResponse(): void {
    this.subs.sink = this.program$.subscribe((res: IGetProgramSummary) => {
      this.programList = [];
      if (res) {
        this.programList = res.result;
        this.programValue();
      }
    });
  }

  programValue(): void {
    const programId = [];
    this.formGroup.get('programLength').setValue(this.programList?.length);
    this.formGroup.get('programId').setValue(null);
    this.programList.forEach((program: IProgramSummary) => {
      programId.push(program.id);
    });
    this.formGroup.get('programId').setValue(programId);
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
