import {IBusinessControl} from '@shared/filters/organization-flow/models/form-group.model';
import {Member} from '@features/organization/enums/member';

export function setBusinessTypeFilter(businessControl: IBusinessControl): string[] {
  let type: string[] = [];
  const typeList: string[] = [Member.School, Member.Provider];
  if (businessControl) {
    if (businessControl?.businessType === 'member') {
      type = typeList;
    } else {
      type.push(businessControl.businessType);
    }
  } else {
    type = typeList;
  }
  return type;
}
