import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environment/environment";
import {compareSegments} from "@angular/compiler-cli/src/ngtsc/sourcemaps/src/segment_marker";
import {CityLocation} from "../Models/cityLocation";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  httpClient = inject(HttpClient)
  private apiKey: string = environment.apiKey;

  getCityLocation(cityName: string): Observable<CityLocation[]> {
    return this.httpClient.get<CityLocation[]>(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${this.apiKey}`);
  }
}
