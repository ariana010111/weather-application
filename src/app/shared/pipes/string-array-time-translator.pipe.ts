import {Pipe, PipeTransform} from '@angular/core';
import {formatDate} from '@angular/common';
import {IDay} from '@features/reports/models/core/schedule.model';

@Pipe({
  name: 'stringArrayTimeTranslator'
})
export class StringArrayTimeTranslatorPipe implements PipeTransform {


  transform(dayAndTime: IDay, timeZone: string): string | Date {
    if (!dayAndTime) {
      return null;
    }

    return `${dayAndTime.dayOfWeek}  ${this.convertStringToTime(dayAndTime.startTime, timeZone)} - ${this.convertStringToTime(dayAndTime.endTime, timeZone)}`;
  }

  convertStringToTime(stringTime: string, timeZone: string): string | Date {
    const splitTimes = stringTime.split(':') as any;
    const date = new Date();
    date.setHours(splitTimes[0]);
    date.setMinutes(splitTimes[1]);
    return formatDate(date, 'h:mm aa', timeZone);
  }
}
