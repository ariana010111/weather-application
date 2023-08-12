import { Pipe, PipeTransform } from '@angular/core';
import {formatDate} from '@angular/common';

@Pipe({
  name: 'stringTimeTranslator'
})
export class StringTimeTranslatorPipe implements PipeTransform {

  transform(time: string, ...args: unknown[]): string {
    if (!time) {
      return null;
    }
    const splits = time.split(':') as any;
    const date = new Date();
    date.setHours(splits[0]);
    date.setMinutes(splits[1]);
    return formatDate(date, 'h:mm aa', 'en-US');
  }
}
