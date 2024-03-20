import {inject, Injectable} from '@angular/core';
import {City} from "../Models/city";
import {HttpClient} from "@angular/common/http";
import {GeocodingService} from "../../weather-info/Services/geocoding.service";
import {CityLocation} from "../../weather-info/Models/cityLocation";
import {Observable, Subject} from "rxjs";
import {CityPost} from "../Models/cityPost";
import {serviceResult} from "../Models/serviceResult";
import {environment} from "../../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  http = inject(HttpClient)
  geocodingService = inject(GeocodingService)
  private apiUrl: string = environment.myApiUrl;

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(`${this.apiUrl}/cities`);
  }

  addCity(cityName: string): Observable<serviceResult> {
    var result = new Subject<serviceResult>();
    this.getCityLocationData(cityName)
      .subscribe({
        next: (cityLocation) => {
          try {
            let newCity: CityPost = {
              cityName: cityName,
              lat: cityLocation[0].lat,
              lon: cityLocation[0].lon
            };
            this.http.post<void>(`${this.apiUrl}/cities`, newCity)
              .subscribe({
                complete: () => {
                  result.next({success: true, message: ''});
                }
              });
          } catch (e) {
            result.next({success: false, message: 'Error during adding new city'});
          }
        }
      });
    return result.asObservable();
  }

  editCity(city: City): Observable<serviceResult> {
    var result = new Subject<serviceResult>();
    this.getCityLocationData(city.cityName)
      .subscribe(cityLocation => {
        try {
          city.lon = cityLocation[0].lon;
          city.lat = cityLocation[0].lat;
          this.http.patch(`${this.apiUrl}/cities`, city).subscribe({
              complete: () => {
                result.next({success: true, message: ''});
              }
            }
          )
        } catch (e) {
          result.next({success: false, message: 'Error during editing city'});
        }
      });
    return result.asObservable();
  }

  private getCityLocationData(cityName: string): Observable<CityLocation[]> {
    return this.geocodingService.getCityLocation(cityName);
  }

  deleteCity(cityId: number): Observable<serviceResult> {
    var result = new Subject<serviceResult>();
    this.http.delete(`${this.apiUrl}/cities/${cityId}`).subscribe(
      {
        next: () => {
          result.next({success: true, message: ''});
        },
        error: () => {
          result.next({success: false, message: 'Error during deleting city'});
        }
      }
    )
    return result.asObservable();
  }
}
