import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environment/environment";
import {CityLocation} from "../Models/cityLocation";
import {WeatherResponse} from "../Models/weatherResponse";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  httpClient = inject(HttpClient)
  private apiKey: string = environment.apiKey;


  getWeather(cityLocation: CityLocation): Observable<WeatherResponse> {
    return this.httpClient.get<WeatherResponse>(`https://api.openweathermap.org/data/3.0/onecall?lat=${cityLocation.lat}&lon=${cityLocation.lon}&units=metric&appid=${this.apiKey}`);
  }
}
