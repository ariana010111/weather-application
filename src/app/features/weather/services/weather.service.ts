import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey = 'd1bb445f4030f9cc7a8cd9e1f6fd8a9b';
  constructor(private http: HttpClient) { }
  getWeatherByCityName(cityName: string, tempType: string): Observable<any> {
    const url = `${this.apiUrl}?q=${cityName}&units=${tempType}&appid=${this.apiKey}`;
    return this.http.get(url);
  }
}
