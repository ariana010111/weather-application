import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {AppReducers, metaReducers} from './store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {CorePrimengModule} from "./core-primeng.module";
import {environment} from "../../environments/environment";
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { LayoutComponent } from './components/layout/layout.component';
import {MenubarModule} from "primeng/menubar";
import {MegaMenuModule} from "primeng/megamenu";
import {HttpClient} from "@angular/common/http";
import {SourceStorageService} from "./services/source-storage.service";

;




@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    CorePrimengModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot(AppReducers, {metaReducers}),
    MenubarModule,
    MegaMenuModule,
  ],
  providers: [
    {provide: 'BASE_API_URL',
    useValue: environment.baseUrl},
  ],
  declarations: [
    TopBarComponent,
    LayoutComponent
  ],
  exports: [
    LayoutComponent
  ],
})
export class CoreModule {
}
