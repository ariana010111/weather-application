import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareReportComponent } from './share-report.component';
import {ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {MultiSelectModule} from 'primeng/multiselect';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ButtonModule} from 'primeng/button';




@NgModule({
  declarations: [
    ShareReportComponent
  ],
  exports: [
    ShareReportComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    MultiSelectModule,
    InputTextareaModule,
    ButtonModule,
  ]
})
export class ShareReportModule { }
