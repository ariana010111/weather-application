import {WeatherService} from "../services/weather.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map, switchMap} from "rxjs/operators";
import {LoadWeatherView, LoadWeatherViewSuccess, WeatherViewActionType} from "./weather.actions";
import {WeatherResponseModel} from "../models/weather-response";
import { Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class WeatherEffects {
  constructor(private weatherService: WeatherService,
              private action$: Actions) {
  }


  onLoadWeather$: Observable<LoadWeatherViewSuccess> = this.action$.pipe(
    ofType(WeatherViewActionType.LoadWeatherView),
    switchMap((action : LoadWeatherView) =>
      this.weatherService.getWeatherByCityName(action.payload.cityName, action.payload.tempType).pipe(
        map((res: WeatherResponseModel) => {
          return new LoadWeatherViewSuccess(res);
        })
      )
    )
  );
}

