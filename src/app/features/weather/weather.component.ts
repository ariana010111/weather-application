import {Component, OnInit} from '@angular/core';
import {WeatherService} from "./services/weather.service";
import {Weather, WeatherResponse} from "./models/weather-response";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit{

  cityWeatherDetail: WeatherResponse = <WeatherResponse>{};
  currenWeather: Weather = <Weather>{}
  tempratureType: string = 'metric';
  constructor(private weatherService: WeatherService) {
  }
  ngOnInit(): void {
    this.fetchData();
    // if (userSelect = 'Fahrenheit')
    // {
    //   this.tempratureType = 'imprial';
    // }
    // else {
    //   this.tempratureType = 'metric';
    // }
  }
  fetchData() {
    this.weatherService.getWeatherByCityName('Istanbul', this.tempratureType).subscribe((res: WeatherResponse) => {
      if (res)
      this.cityWeatherDetail = res;
      this.currenWeather = res.weather[0];
    })
  }
}
