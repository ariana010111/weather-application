import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherComponent } from './weather.component';
import {CorePrimengModule} from "../../core/core-primeng.module";
import {WeatherService} from "./services/weather.service";
import {HttpClientModule} from "@angular/common/http";
import { CityWeatherDetailComponent } from './components/city-weather-detail/city-weather-detail.component';
import {CardModule} from "primeng/card";
import { WeatherHeaderComponent } from './components/weather-header/weather-header.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    WeatherComponent,
    CityWeatherDetailComponent,
    WeatherHeaderComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        WeatherRoutingModule,
        CorePrimengModule,
        CardModule

    ],
  providers: [
    HttpClientModule,
    WeatherService
  ],
  exports: [HttpClientModule],

})
export class WeatherModule { }
