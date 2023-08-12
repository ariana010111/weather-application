import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MemberComponent} from '@shared/filters/member/member.component';
import {ReactiveFormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {PipesModule} from '@shared/pipes/pipes.module';
import {DirectivesModule} from "@shared/directives/directives.module";



@NgModule({
  declarations: [
    MemberComponent,
  ],
  exports: [
    MemberComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DropdownModule,
        MultiSelectModule,
        OverlayPanelModule,
        PipesModule,
        DirectivesModule
    ]
})
export class MemberModule { }
