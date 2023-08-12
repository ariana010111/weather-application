import {Pipe, PipeTransform} from '@angular/core';
import {IMember} from '@features/organization/models/member.model';

@Pipe({
  name: 'memberTranslator'
})
export class MemberTranslatorPipe implements PipeTransform {

  // @ts-ignore
  transform(organization?: any, memberValue?: string[] | any, memberOption?: IMember[]): string {

    if (memberOption?.length) {
      switch (organization) {
        case 'all':
          if (memberValue?.length === memberOption?.length) {
            return 'All items';
          } else if (memberValue?.length > 1) {
            return `${memberValue?.length}` + ' items';
          } else if (memberValue?.length === 1) {
            return 'One item';
          } else if (memberValue?.length === 0) {
            return 'None';
          }
          break;
        case 'school':
          if (memberValue?.length === memberOption?.length) {
            return 'All schools';
          } else if (memberValue?.length > 1) {
            return `${memberValue?.length}` + ' schools';
          } else if (memberValue?.length === 1) {
            return 'One school';
          } else if (memberValue?.length === 0) {
            return 'None';
          }
          break;
        case 'provider':
          if (memberValue?.length === memberOption?.length) {
            return 'All providers';
          } else if (memberValue?.length > 1) {
            return `${memberValue?.length}` + ' providers';
          } else if (memberValue?.length === 1) {
            return 'One provider';
          } else if (memberValue?.length === 0) {
            return 'None';
          }
          break;
        default:
          return '--';
      }
    } else {
      return '--';
    }


  }

}
