import {Action} from "@ngrx/store";
import {HttpErrorResponse} from "@angular/common/http";
import {WeatherResponseModel} from "../models/weather-response";
import {WeatherQueryModel, WeatherUniqueQuery} from "../models/query.model";

export enum WeatherViewActionType {
  LoadWeatherView = '[WeatherView] Load Report Trigger',
  LoadWeatherViewSuccess = '[WeatherView] Load Report Success',
  LoadWeatherViewFailure = '[WeatherView] Load Report Failure',

  LoadWeatherViewFiltersQuery = '[WeatherView] Load Filters Query trigger',
}

export class LoadWeatherView implements Action {
  readonly type = WeatherViewActionType.LoadWeatherView;

  constructor(public payload: WeatherUniqueQuery) {
  }
}

export class LoadWeatherViewSuccess implements Action {
  readonly type = WeatherViewActionType.LoadWeatherViewSuccess;

  constructor(public payload: WeatherResponseModel) {
  }
}

export class LoadWeatherViewFailure implements Action {
  readonly type = WeatherViewActionType.LoadWeatherViewFailure;

  constructor(public payload: HttpErrorResponse) {
  }
}



export class LoadWeatherViewFiltersQuery implements Action {
  readonly type = WeatherViewActionType.LoadWeatherViewFiltersQuery;

  constructor(public queryString: WeatherUniqueQuery) {
  }
}



export type WeatherViewActions =
  | LoadWeatherView
  | LoadWeatherViewSuccess
  | LoadWeatherViewFailure
  | LoadWeatherViewFiltersQuery;
