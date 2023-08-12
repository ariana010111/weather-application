import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StaffStatusComponent} from '@shared/filters/staff-status/staff-status.component';
import {DirectivesModule} from '@shared/directives/directives.module';
import {DropdownModule} from 'primeng/dropdown';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    StaffStatusComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    DropdownModule,
    ReactiveFormsModule
  ],
  exports: [
    StaffStatusComponent
  ]
})
export class StaffStatusModule { }
