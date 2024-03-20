import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environment/environment";
import {CityLocation} from "../Models/cityLocation";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  httpClient = inject(HttpClient)
  private apiKey: string = environment.apiKey;

  getCityLocation(cityName: string): Observable<CityLocation[]> {
    return this.httpClient.get<CityLocation[]>(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${this.apiKey}`);
  }
}
