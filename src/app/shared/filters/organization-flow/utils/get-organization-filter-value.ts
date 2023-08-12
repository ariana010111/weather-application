import {IOrganizationFormGroup} from '@features/reports/models/core/filters-form-group.model';
import {setBusinessTypeFilter} from '@shared/filters/organization-flow/utils/set-business-type-filter';
import {IBusinessBaseFilter} from '@features/reports/models/core/business-base-filter.model';

export function getOrgFiltersValue(filters: IOrganizationFormGroup, yearView: boolean): IBusinessBaseFilter {
  let businessListId = [];
  let seasonListId = [];
  let programListId = [];
  let scheduleListId = [];
  if (filters) {
    if (filters?.business?.businessLength) {
      if (filters?.business?.businessLength === filters?.business?.businessId?.length) {
        businessListId = null;
      } else {
        businessListId = filters?.business?.businessId;
      }
    } else {
      businessListId = null;
    }
    if (!yearView) {
      if (filters?.season?.seasonLength === filters?.season?.seasonId?.length) {
        seasonListId = null;
      } else {
        seasonListId = filters?.season?.seasonId;
      }

    } else {
      seasonListId = null;
    }

    if (filters?.program?.programLength) {
      if (filters?.program?.programLength === filters?.program?.programId?.length) {
        programListId = null;
      } else {
        programListId = filters?.program?.programId;
      }

    } else {
      programListId = null;
    }
    if (filters?.schedule?.scheduleLength) {
      if (filters?.schedule?.scheduleLength === filters?.schedule?.scheduleId?.length) {
        scheduleListId = null;
      } else {
        scheduleListId = filters?.schedule?.scheduleId;
      }

    } else {
      scheduleListId = null;
    }
    return {
      businessType: setBusinessTypeFilter(filters?.business),
      businessIds: (filters?.business?.businessId && filters?.business?.businessId?.length > 0
        && businessListId && businessListId?.length > 0)
        ? businessListId : null,
      seasonId: (seasonListId && seasonListId?.length > 0) ? seasonListId : null,
      semester: (yearView && filters?.seasonType?.semester !== 'all') ?
        filters?.seasonType?.semester : null,
      year: (yearView && filters?.seasonType?.year !== 'All') ?
        filters?.seasonType?.year : null,
      programId: (programListId && programListId?.length > 0) ? programListId : null,
      programScheduleId: scheduleListId ? scheduleListId : null,
    };

  } else {
    return null;
  }

}
