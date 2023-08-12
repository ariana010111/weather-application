import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderStatusComponent } from './order-status.component';
import {DirectivesModule} from '@shared/directives/directives.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MultiSelectModule} from 'primeng/multiselect';
import {PipesModule} from '@shared/pipes/pipes.module';



@NgModule({
  declarations: [
    OrderStatusComponent
  ],
  exports: [
    OrderStatusComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    ReactiveFormsModule,
    MultiSelectModule,
    PipesModule
  ]
})
export class OrderStatusModule { }
