import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-weather-header',
  templateUrl: './weather-header.component.html',
  styleUrls: ['./weather-header.component.scss']
})
export class WeatherHeaderComponent {
  cityName: string = ' ';
  @Output() searchedCity = new EventEmitter<string>();
  getCityName(cityName: string) {
    console.log(cityName);
    this.searchedCity.emit(cityName);
  }
}
