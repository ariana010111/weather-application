import {ChangeDetectionStrategy, Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, UntypedFormControl, UntypedFormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SubSink} from 'subsink';
import {translatedMember} from '@features/organization/enums/member';
import {BehaviorSubject, debounceTime, distinctUntilChanged, Observable} from 'rxjs';
import {IMember} from '@features/organization/models/member.model';
import {select, Store} from '@ngrx/store';
import {AppState} from '@core/store';
import {
  selectGroupedMember,
  selectMember,
} from '@features/organization/stores/member/member.reducers';
import {LoadMember} from '@features/organization/stores/member/member.actions';
import {IGroupedMember} from '@features/organization/models/grouped-member.model';
import {IGetMemberRequest} from '@features/organization/models/get-member-request.model';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MemberComponent),
      multi: true,
    },
  ],
})
export class MemberComponent implements OnInit, ControlValueAccessor, OnDestroy {
  @Input() index?: number;
  formGroup: UntypedFormGroup;
  subs = new SubSink();
  organization = translatedMember;
  members$: Observable<IMember[]>;
  groupedMember$: Observable<IGroupedMember[]>;
  memberOption: IMember[];
  memberOption$: BehaviorSubject<IMember[]> = new BehaviorSubject<IMember[]>(null);
  membersList: string[];
  constructor(private store: Store<AppState>,
  ) {
    // this.dispatchMember(this.organization[0].value.toString());
    this.initializationFromGroup();
    this.members$ = store.pipe(select(selectMember));
    this.groupedMember$ = store.pipe(select(selectGroupedMember));
    this.subscribeMembersValue();

  }

  ngOnInit(): void {
  }

  initializationFromGroup(): void {
    this.formGroup = new UntypedFormGroup({
      organization: new UntypedFormControl(this.organization[0].value),
      memberList: new UntypedFormControl([]),
      business: new UntypedFormControl(null),
    });

  }

  subscribeMembersValue(): void {
    this.subs.sink = this.members$.subscribe((res: IMember[]) => {
      this.membersList = [];
      this.memberOption = [];
      let type = 'all';
      if (res?.length) {
        switch (this.formGroup.get('organization').value) {
          case 'school':
            type = 'school';
            break;
          case 'provider':
            type = 'provider';
            break;
          default:
            type = 'all';
        }
        if (type !== 'all') {
          this.memberOption = res.filter(e => e.type === type);
        } else {

          this.memberOption = res;
        }
        this.memberOption$.next(this.memberOption);
        this.memberOption.forEach(member => {
          const item = member.name;
          this.membersList.push(item);
        });
        this.formGroup.get('memberList').setValue(this.membersList);
        // this.formGroup.get('business').setValue(this.membersList);
      }
    });
  }

  dispatchMember(memberBody: IGetMemberRequest): void {
    this.store.dispatch(new LoadMember(memberBody));
  }

  registerOnChange(fn: (x: any) => void): void {
    this.subs.sink = this.formGroup.valueChanges.pipe(
      debounceTime(700),
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


  onChangeOrganization(): void {
    this.formGroup.get('memberList').setValue(null);
    this.formGroup.get('business').setValue(null);
    this.subscribeMembersValue();
  }

  checkBusinessList(event): void {
    if (event.value.length === 0 || event.value.length === this.membersList.length) {
      this.formGroup.get('business').setValue(null);
    } else {
      const memberList = this.formGroup.get('memberList').value;
      this.formGroup.get('business').setValue(memberList);
    }
  }
}
