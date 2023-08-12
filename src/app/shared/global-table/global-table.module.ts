import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalTableComponent } from './global-table.component';
import {TableModule} from 'primeng/table';
import {PipesModule} from '@shared/pipes/pipes.module';
import {DirectivesModule} from '@shared/directives/directives.module';
import {ShowAddressModule} from '@shared/show-address/show-address.module';



@NgModule({
    declarations: [
        GlobalTableComponent
    ],
    exports: [
        GlobalTableComponent
    ],
    imports: [
        CommonModule,
        TableModule,
        PipesModule,
        DirectivesModule,
        ShowAddressModule,
    ]
})
export class GlobalTableModule { }
