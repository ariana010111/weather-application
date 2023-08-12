import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SeasonTypeComponent} from '@shared/filters/season-type/season-type.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PipesModule} from '@shared/pipes/pipes.module';
import {DropdownModule} from 'primeng/dropdown';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {MultiSelectModule} from 'primeng/multiselect';
import {DirectivesModule} from '@shared/directives/directives.module';



@NgModule({
  declarations: [
    SeasonTypeComponent
  ],
  exports: [
    SeasonTypeComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PipesModule,
        DropdownModule,
        OverlayPanelModule,
        MultiSelectModule,
        DirectivesModule
    ]
})
export class SeasonTypeModule { }
