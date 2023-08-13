import {WeatherResponseModel} from "../models/weather-response";
import {WeatherUniqueQuery} from "../models/query.model";
import {WeatherViewActions, WeatherViewActionType} from "./weather.actions";
import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as fromWeather from "../stores/weather.reducers";
export interface WeatherState {
  WeatherResponseModel: WeatherResponseModel | null;
  requestUniqueQuery: WeatherUniqueQuery | null;
  loading: boolean;
}

export const initialWeatherState: WeatherState = {
  WeatherResponseModel: null,
  requestUniqueQuery: null,
  loading: false,
};

export function WeatherReducer(
  state: WeatherState = initialWeatherState,
  action: WeatherViewActions): WeatherState {
  switch (action.type) {
    case WeatherViewActionType.LoadWeatherView:
      return {
        ...state,
        loading: true,
      };

    case WeatherViewActionType.LoadWeatherViewSuccess:
      return {
        ...state,
        loading: false,
        WeatherResponseModel: action.payload,
      };

    case WeatherViewActionType.LoadWeatherViewFiltersQuery:
      return {
        ...state,
        requestUniqueQuery: action.queryString,
      };
    default:
      return state;
  }
}
export interface State extends fromWeather.WeatherState {
  'weatherState': WeatherState;
}
export const selectWeatherState = createFeatureSelector<WeatherState>('weatherState');
export const selectRowData = createSelector(selectWeatherState, state => state?.WeatherResponseModel);
export const selectWeatherQueryString = createSelector(
  selectWeatherState, state => state?.requestUniqueQuery);
export const loadingState = createSelector(selectWeatherState, state => state?.loading);
