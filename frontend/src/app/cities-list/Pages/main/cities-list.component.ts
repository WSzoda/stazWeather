import {Component, inject} from '@angular/core';
import {AuthService} from "../../../authorization/Services/auth.service";
import {HttpClient} from "@angular/common/http";
import {CitiesService} from "../../Services/cities.service";
import {City} from "../../Models/city";
import {CityCardAddComponent} from "../../UI/city-card-add/city-card-add.component";
import {CityCardComponent} from "../../UI/city-card/city-card.component";
import {NgFor} from "@angular/common";
import {firstValueFrom} from "rxjs";
import {WeatherService} from "../../../weather-info/Services/weather.service";
import {CityLocation} from "../../../weather-info/Models/cityLocation";
import {WeatherResponse} from "../../../weather-info/Models/weatherResponse";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cities-list',
  standalone: true,
  imports: [
    CityCardAddComponent,
    CityCardComponent,
    NgFor,
  ],
  templateUrl: './cities-list.component.html',
  styleUrl: './cities-list.component.css'
})
export class CitiesListComponent {
  citiesService = inject(CitiesService)
  weatherService = inject(WeatherService)
  router = inject(Router)
  cities: City[] = [];
  cityWithWeather: Array<{ city: City, weather: WeatherResponse }> = [];

  addNewCity(cityName: string): void {
    this.citiesService.addCity(cityName);
    console.log(cityName);
  }

  deleteCity(cityId: number): void {
    this.citiesService.deleteCity(cityId);
  }

  async ngOnInit(): Promise<void> {
    this.cities = await this.citiesService.getCities();
    for (let city of this.cities) {
      let weather = await firstValueFrom(this.weatherService.getWeather({
        name: city.cityName,
        lat: city.lat,
        lon: city.lon
      }));
      this.cityWithWeather.push({city, weather});
    }
  }


}
