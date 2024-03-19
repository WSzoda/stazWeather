import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class GeocodingServiceService {
  httpClient = inject(HttpClient)
  apiKey: string = environment.apiKey;

  getCityLocation(cityName: string): void {
    this.httpClient.get()
  }
}
