import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./core/components/layout/layout.component";

const routes: Routes = [
  {path: '',
   component: LayoutComponent,
   children: [
     {
       path: 'weather',
       loadChildren: () =>
         import('./features/weather/weather.module').then(
           (m) => m.WeatherModule
         ),
     },
     {
       path: 'setting',
       loadChildren: () =>
         import('./features/setting/setting.module').then(
           (m) => m.SettingModule
         )
     }
   ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
