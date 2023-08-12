import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConnectFormDirective} from '@shared/directives/connect-form.directive';
import {FormGroupDirective} from '@angular/forms';
import {EllipsisDirective} from '@shared/directives/ellipsis.directive';
import {ClickStopPropagationDirective} from '@shared/directives/click-stop-propagation.directive';
import {EditModeDirective} from '@shared/directives/editable/edit-mode.directive';
import {EditableComponent} from '@shared/directives/editable/editable.component';
import {ViewModeDirective} from '@shared/directives/editable/view-mode.directive';
import { MenuComponent } from './menu/menu.component';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { MenuListDirective } from './menu/menu-list.directive';
import { CustomGridColumnsDirective } from './custom-grid-columns.directive';


@NgModule({
  declarations: [
    ConnectFormDirective,
    EllipsisDirective,
    ClickStopPropagationDirective,
    EditModeDirective,
    EditableComponent,
    ViewModeDirective,
    MenuComponent,
    MenuListDirective,
    CustomGridColumnsDirective,
  ],
    imports: [
        CommonModule,
        OverlayPanelModule
    ],
  exports: [
    ConnectFormDirective,
    EllipsisDirective,
    ClickStopPropagationDirective,
    EditModeDirective,
    EditableComponent,
    ViewModeDirective,
    MenuComponent,
    CustomGridColumnsDirective,
  ],
  providers: [FormGroupDirective]
})
export class DirectivesModule {
}
