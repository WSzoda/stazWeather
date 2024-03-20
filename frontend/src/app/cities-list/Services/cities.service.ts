import {inject, Injectable} from '@angular/core';
import {City} from "../Models/city";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../authorization/Services/auth.service";
import {GeocodingService} from "../../weather-info/Services/geocoding.service";
import {CityLocation} from "../../weather-info/Models/cityLocation";
import {WeatherService} from "../../weather-info/Services/weather.service";
import {Observable} from "rxjs";
import {WeatherResponse} from "../../weather-info/Models/weatherResponse";
import {CityPost} from "../Models/cityPost";

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  authService = inject(AuthService)
  http = inject(HttpClient)
  geocodingService = inject(GeocodingService)
  weatherService = inject(WeatherService)

  async getCities(): Promise<City[]> {
    let cities: City[] = [];
    if (this.authService.currentUserSig()?.token) {
      try {
        const response = await this.http.get<City[]>('http://localhost:5202/cities').toPromise();
        console.log(response);
        cities = [...response!];
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    }
    return cities;
  }

  addCity(cityName: string): void {
    this.geocodingService.getCityLocation(cityName)
      .subscribe(cityLocation => {
        let newCity: CityPost = {
          cityName: cityLocation[0].name,
          lat: cityLocation[0].lat,
          lon: cityLocation[0].lon
        };
        this.http.post<void>('http://localhost:5202/cities', newCity).subscribe(
          response => {
            console.log("city Added")
          }
        )
      })
  }

  deleteCity(cityId: number): void {
    this.http.delete(`http://localhost:5202/cities/${cityId}`).subscribe(
      response => {
        console.log("city deleted");
      }
    )
  }
}
