import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherComponent } from './weather.component';
import {CorePrimengModule} from "../../core/core-primeng.module";
import {WeatherService} from "./services/weather.service";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    WeatherComponent
  ],
    imports: [
        CommonModule,
      HttpClientModule,
        WeatherRoutingModule,
        CorePrimengModule
    ],
  providers: [
    WeatherService
  ]

})
export class WeatherModule { }
