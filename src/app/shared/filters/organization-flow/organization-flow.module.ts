import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrganizationFlowComponent} from './organization-flow.component';
import {ReactiveFormsModule} from '@angular/forms';
import {DirectivesModule} from '@shared/directives/directives.module';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {BusinessComponent} from './components/business/business.component';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import {SeasonComponent} from './components/season/season.component';
import {ProgramComponent} from './components/program/program.component';
import {ProgramScheduleComponent} from './components/program-schedule/program-schedule.component';
import {SeasonTypeComponent} from './components/season-type/season-type.component';
import { OrgInfoPipe } from './pipes/org-info.pipe';


@NgModule({
  declarations: [
    OrganizationFlowComponent,
    BusinessComponent,
    SeasonComponent,
    ProgramComponent,
    ProgramScheduleComponent,
    SeasonTypeComponent,
    OrgInfoPipe,
  ],
  exports: [
    OrganizationFlowComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DirectivesModule,
    OverlayPanelModule,
    DropdownModule,
    MultiSelectModule
  ]
})
export class OrganizationFlowModule {
}
