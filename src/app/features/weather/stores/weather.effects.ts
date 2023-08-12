import {WeatherService} from "../services/weather.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map, switchMap} from "rxjs/operators";

export class WeatherEffects {
  constructor(private weatherService: WeatherService,
              private action$: Actions) {
  }

  // onLoadWeather$ = createEffect(
  //   () => this.action$.pipe(
  //     ofType(WeatherActionType.LoadWeatherView),
  //     switchMap((action : LoadWeatherView) =>
  //       this.weatherService.getWeatherByCityName(action.payload).pipe(
  //         map((res: WeatherViewResponseModel) => {
  //           return new LoadWeatherViewSuccess(res);
  //         })
  //       )
  //     )
  //   )
  // )
}
