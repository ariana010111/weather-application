import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {WeatherResponse} from "../models/weather-response";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey = 'd1bb445f4030f9cc7a8cd9e1f6fd8a9b';
  constructor(private http: HttpClient) { }
//units	optional	standard, metric, imperial. When you do not use the units parameter,
// format is standard by default.
  //imprial same with furenheit
  // deg metric
  getWeatherByCityName(cityName: string, tempType: string): Observable<any> {
    const url = `${this.apiUrl}?q=${cityName}&units=${tempType}&appid=${this.apiKey}`;
    return this.http.get(url);
  }
}
