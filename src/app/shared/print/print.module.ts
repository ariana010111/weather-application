import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintComponent } from './print.component';
import {SidebarModule} from 'primeng/sidebar';



@NgModule({
  declarations: [
    PrintComponent
  ],
  exports: [
    PrintComponent,
  ],
  imports: [
    CommonModule,
    SidebarModule
  ]
})
export class PrintModule { }
