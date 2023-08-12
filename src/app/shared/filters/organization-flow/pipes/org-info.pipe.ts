import {Pipe, PipeTransform} from '@angular/core';
import {getOrgFiltersValue} from '@shared/filters/organization-flow/utils/get-organization-filter-value';
import {IOrganizationFormGroup} from '@features/reports/models/core/filters-form-group.model';
import {translatedSeason} from '@shared/filters/season-type/enums/season';
import {EnumTranslatorPipe} from '@shared/pipes/enum-translator.pipe';

@Pipe({
  name: 'orgInfo'
})
export class OrgInfoPipe implements PipeTransform {
  constructor(private enumTranslatorPipe: EnumTranslatorPipe) {
  }

  transform(formFilter: IOrganizationFormGroup, yearView: boolean): string {
    const filters = getOrgFiltersValue(formFilter, yearView);
    let term = '';

    if (filters?.programScheduleId && filters?.programScheduleId?.length) {
      if (filters?.programScheduleId?.length === 1) {
        term = `${filters?.programScheduleId?.length}` + ' schedule';
      } else {
        term = `${filters?.programScheduleId?.length}` + ' schedules';
      }
      return term;
    }
    if (filters?.programId && filters?.programId?.length) {
      if (filters?.programId?.length === 1) {
        term = `${filters?.programId?.length}` + ' program';
      } else {
        term = `${filters?.programId?.length}` + ' programs';
      }
      return term;
    }
    if (filters?.seasonId && filters?.seasonId?.length && !yearView) {
      if (filters?.seasonId?.length === 1) {
        term = `${filters?.seasonId?.length}` + ' season';
      } else {
        term = `${filters?.seasonId?.length}` + ' seasons';
      }
      return term;
    }
    if (filters?.semester || filters?.year && yearView) {
      const seasonType = translatedSeason;
      const semester = filters?.semester ? filters?.semester : 'all';
      const seasonEnum = this.enumTranslatorPipe.transform(semester, seasonType);
      const year = filters?.year ? ' ' + filters?.year : ', all years';
      term = `${seasonEnum}` + `${year}`;
      return term;
    }

    if (filters?.businessType) {
      const memberType = filters?.businessType.length === 1 ? filters?.businessType : 'member';
      if (filters?.businessIds?.length > 0) {
        if (filters?.businessIds?.length === 1) {
          term = `${filters?.businessIds?.length} ` + `${memberType}`;
        } else if (filters?.businessIds?.length > 1) {
          term = `${filters?.businessIds?.length} ` + `${memberType}` + 's';
        }
      } else {
        if (formFilter?.business?.businessLength > 0 && formFilter?.business?.businessId.length === 0) {
          term = 'Invalid members';
        } else {
          term = `All ` + `${memberType}` + 's';
        }
      }
      return term;
    }
    return 'None';
  }

}
