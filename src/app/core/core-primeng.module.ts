import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {TieredMenuModule} from 'primeng/tieredmenu';
import { MenubarModule } from 'primeng/menubar';
@NgModule({
  exports: [
    CommonModule,
    DropdownModule,
    InputTextModule,
    TieredMenuModule,
    MenubarModule
  ]
})
export class CorePrimengModule {
}
