import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import {DropdownModule} from "primeng/dropdown";
import {TranslocoRootModule} from "../../transloco-root.module";

@NgModule({
  declarations: [
    SettingComponent
  ],
    imports: [
        CommonModule,
        DropdownModule,
        SettingRoutingModule,
        TranslocoRootModule,
    ]
})
export class SettingModule { }
