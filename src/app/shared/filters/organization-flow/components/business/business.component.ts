import {ChangeDetectionStrategy, Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, UntypedFormControl, UntypedFormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Member, translatedMember} from '@features/organization/enums/member';
import {debounceTime, distinctUntilChanged, Observable} from 'rxjs';
import {SubSink} from 'subsink';
import {IGroupedMember} from '@features/organization/models/grouped-member.model';
import {IMemberSummary} from '@features/organization/models/get-member-response.model';
import {select, Store} from '@ngrx/store';
import {AppState} from '@core/store';
import {selectGroupedMember, selectMemberSummary} from '@features/organization/stores/member/member.reducers';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BusinessComponent),
      multi: true,
    },
  ],
})
export class BusinessComponent implements OnInit, ControlValueAccessor, OnDestroy {
  formGroup: UntypedFormGroup;
  businessType = translatedMember;
  subs = new SubSink();
  groupedMember$: Observable<IGroupedMember[]>;
  memberSummary$: Observable<IMemberSummary[]>;
  businessSummaryList: IMemberSummary[];
  businessGroupedMember: IGroupedMember[];
  businessOptionList: IMemberSummary[] | IGroupedMember[];

  constructor(private store: Store<AppState>) {
    this.groupedMember$ = store.pipe(select(selectGroupedMember));
    this.memberSummary$ = store.pipe(select(selectMemberSummary));
    this.initFromGroup();
  }

  ngOnInit(): void {
    this.subGroupedMemberResponse();
    this.subBusinessResponse();
  }

  initFromGroup(): void {
    this.formGroup = new UntypedFormGroup({
      businessType: new UntypedFormControl(Member.All),
      businessId: new UntypedFormControl([]),
      businessLength: new UntypedFormControl(0),
    });
  }

  onChangeBusiness(): void {
    this.businessValue(this.formGroup.get('businessType').value);
  }

  subGroupedMemberResponse(): void {
    this.subs.sink = this.groupedMember$.subscribe((res: IGroupedMember[]) => {
      this.businessGroupedMember = [];
      if (res) {
        this.businessGroupedMember = res;
      }
    });
  }

  subBusinessResponse(): void {
    this.subs.sink = this.memberSummary$.subscribe((res: IMemberSummary[]) => {
      this.businessSummaryList = [];
      if (res) {
        this.businessSummaryList = res;
      }
    });
  }

  businessValueAfterChange(obj: { businessType: string, businessId: string[] }): void {

    this.formGroup.get('businessId').patchValue(null);
    this.getBusinessOptionList(obj.businessType);
    this.formGroup.get('businessId').patchValue(obj.businessId);
  }

  businessValue(type: string): void {
    this.getBusinessOptionList(type);
    const idList = [];
    this.businessOptionList.forEach(business => {
      idList.push(business.id.toString());
    });
    this.formGroup.get('businessId').patchValue(null);
    this.formGroup.get('businessId').patchValue(idList);
  }

  getBusinessOptionList(businessType: string): IMemberSummary[] | IGroupedMember[] {

    this.businessOptionList = [];
    if (businessType !== 'member') {
      this.businessOptionList = this.businessSummaryList.filter(e => e.type === businessType);
    } else {
      this.businessOptionList = this.businessSummaryList;
    }
    this.formGroup.get('businessLength').patchValue(this.businessOptionList?.length);
    return this.businessOptionList;
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
      this.formGroup.setValue(obj, {emitEvent: false});
      this.businessValueAfterChange(obj);
    } else {
      this.businessValue('member');

    }

  }

  onPanelHide(): void {
    const businessId = this.formGroup.get('businessId').value;
    const businessLength = this.formGroup.get('businessLength').value;
    if (businessLength > 0 && businessId?.length === 0) {
      this.onChangeBusiness();
    }
  }

  ngOnDestroy(): void {
    // this.onPanelHide(); <need>
    this.subs.unsubscribe();
  }


}
