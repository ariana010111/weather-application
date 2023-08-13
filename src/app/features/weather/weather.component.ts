import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {WeatherService} from "./services/weather.service";
import {Weather, WeatherResponseModel} from "./models/weather-response";
import {take} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit{

  cityWeatherDetail: WeatherResponseModel | undefined;
  tempratureType: string = 'metric';
  destroyRef = inject(DestroyRef);
  cityName: string = 'Shiraz';
  constructor(private weatherService: WeatherService) {
  }
  ngOnInit(): void {
    this.fetchData(this.cityName);

  }
  fetchData(cityName: string) {
    this.weatherService.getWeatherByCityName(cityName, this.tempratureType)
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe((res: WeatherResponseModel) => {
      if (res) {
        this.cityWeatherDetail = res;
      }

    })
  }

  cityChanged(event: string) {
    console.log('hal', event);
    this.fetchData(event);
  }
}
