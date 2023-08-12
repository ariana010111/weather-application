import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowAddressComponent } from './show-address.component';



@NgModule({
    declarations: [
        ShowAddressComponent
    ],
    exports: [
        ShowAddressComponent
    ],
    imports: [
        CommonModule
    ]
})
export class ShowAddressModule { }
