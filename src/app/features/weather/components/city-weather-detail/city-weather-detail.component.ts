import {Component, Input} from '@angular/core';
import {WeatherResponseModel} from "../../models/weather-response";

@Component({
  selector: 'app-city-weather-detail',
  templateUrl: './city-weather-detail.component.html',
  styleUrls: ['./city-weather-detail.component.scss']
})
export class CityWeatherDetailComponent {
@Input() weatherDetail!:WeatherResponseModel;
}
