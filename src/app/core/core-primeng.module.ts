import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {MegaMenuModule} from "primeng/megamenu";
@NgModule({
  exports: [
    CommonModule,
    DropdownModule,
    InputTextModule,
    TieredMenuModule,
    MegaMenuModule
  ]
})
export class CorePrimengModule {
}
