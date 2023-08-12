import {NgModule } from '@angular/core';
import {CommonModule } from '@angular/common';
import {PropertySearchBoxComponent } from './property-search-box.component';
import {ReactiveFormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {TooltipModule} from 'primeng/tooltip';
import {ButtonModule} from 'primeng/button';



@NgModule({
    declarations: [
        PropertySearchBoxComponent
    ],
    exports: [
        PropertySearchBoxComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    TooltipModule,
    ButtonModule,
  ]
})
export class PropertySearchBoxModule { }
