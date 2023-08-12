import { Pipe, PipeTransform } from '@angular/core';
import {formatDate} from '@angular/common';

@Pipe({
  name: 'percentAmountPriceTranslator'
})
export class PercentAmountPriceTranslatorPipe implements PipeTransform {

  transform(price: string): string {

    if (price.includes('percent')) {
       price = price.split('percent') as any;
       price = price[0] + '%';
       return price;
    }
    else if (price.includes('fixed')) {
      price = price.split('fixed') as any;
      return price[0];
    }
    else {
      return null;
    }
  }

}
