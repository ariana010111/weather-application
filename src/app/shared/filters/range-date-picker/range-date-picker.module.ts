import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangeDatePickerComponent } from './range-date-picker.component';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {ReactiveFormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {DividerModule} from 'primeng/divider';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DirectivesModule} from "@shared/directives/directives.module";



@NgModule({
    declarations: [
        RangeDatePickerComponent,
    ],
    exports: [
        RangeDatePickerComponent,
    ],
    imports: [
        CommonModule,
        OverlayPanelModule,
        ReactiveFormsModule,
        DropdownModule,
        CalendarModule,
        DividerModule,
        RadioButtonModule,
        DirectivesModule
    ]
})
export class RangeDatePickerModule { }
