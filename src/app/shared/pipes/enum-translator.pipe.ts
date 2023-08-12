import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'enumTranslator',
})
export class EnumTranslatorPipe implements PipeTransform {
  transform(value: any, args?: any[]): string {
    if (!value) {
      return '--';
    }
    const find = args.find((x) => x.value === value)?.label;
    return find ? find : value;
  }
}
