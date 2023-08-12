import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnsComponent } from './columns.component';
import {CheckboxModule} from 'primeng/checkbox';
import {ReactiveFormsModule} from '@angular/forms';
import {DividerModule} from "primeng/divider";
import {ButtonModule} from "primeng/button";



@NgModule({
  declarations: [
    ColumnsComponent
  ],
  exports: [
    ColumnsComponent
  ],
  imports: [
    CommonModule,
    CheckboxModule,
    ReactiveFormsModule,
    DividerModule,
    ButtonModule
  ]
})
export class ColumnsModule { }
