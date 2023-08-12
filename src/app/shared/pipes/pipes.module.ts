import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EnumTranslatorPipe} from '@shared/pipes/enum-translator.pipe';
import {MemberTranslatorPipe} from '../filters/member/pipe/member-translator.pipe';
import {StringTimeTranslatorPipe} from '@shared/pipes/string-time-translator.pipe';
import {MultiSelectInfoPipe} from './multi-select-info.pipe';
import {StringArrayTimeTranslatorPipe} from './string-array-time-translator.pipe';
import {ScheduleTitleTranslatorPipe} from '@shared/pipes/schedule-title-translator.pipe';
import { PercentAmountPriceTranslatorPipe } from './percent-amount-price-translator.pipe';


@NgModule({
  declarations: [
    EnumTranslatorPipe,
    MemberTranslatorPipe,
    StringTimeTranslatorPipe,
    MultiSelectInfoPipe,
    StringArrayTimeTranslatorPipe,
    ScheduleTitleTranslatorPipe,
    PercentAmountPriceTranslatorPipe,
  ],
    exports: [
        EnumTranslatorPipe,
        MemberTranslatorPipe,
        StringTimeTranslatorPipe,
        MultiSelectInfoPipe,
        StringArrayTimeTranslatorPipe,
        ScheduleTitleTranslatorPipe,
        PercentAmountPriceTranslatorPipe,

    ],
  imports: [
    CommonModule
  ]
})
export class PipesModule {
}
