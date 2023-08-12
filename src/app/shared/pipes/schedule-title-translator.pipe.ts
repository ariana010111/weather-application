import {Pipe, PipeTransform} from '@angular/core';
import {ISchedule} from '@features/reports/models/core/schedule.model';

@Pipe({
  name: 'scheduleTitleTranslator'
})
export class ScheduleTitleTranslatorPipe implements PipeTransform {


  transform(schedule: ISchedule, timeZone: string): string | Date {
    if (!schedule) {
      return null;
    }
    if (schedule.title) {
      return `${schedule.title} (${this.convertStringToTime(schedule.startDate, timeZone)} -
       ${this.convertStringToTime(schedule.endDate, timeZone)})`;
    } else {
      if (schedule?.startDate && schedule?.endDate) {
        return `${this.convertStringToTime(schedule?.startDate, timeZone)}-
      ${this.convertStringToTime(schedule?.endDate, timeZone)}`;
      } else {
        return `${this.convertStringToTime(schedule?.startDate || schedule?.endDate, timeZone)}`;
      }
    }
  }

  convertStringToTime(date: string, timeZone: string): string | Date {
    return new Date(date).toLocaleDateString(timeZone , { year: 'numeric', month: 'short', day: 'numeric'});
  }
}
