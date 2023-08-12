import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'multiSelectInfo'
})
export class MultiSelectInfoPipe implements PipeTransform {

  transform(selectedItem: number, args: unknown[]): string {
    if (selectedItem < args.length && selectedItem > 1) {
      return `${selectedItem}` + ' items selected';
    } else if (selectedItem === 1) {
      return 'One item selected';
    } else if (selectedItem === args.length) {
      return 'All';
    } else {
      return 'None';
    }
  }

}
