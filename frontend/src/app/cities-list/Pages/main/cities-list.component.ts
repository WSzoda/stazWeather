import {Component, inject} from '@angular/core';
import {AuthService} from "../../../authorization/Services/auth.service";
import {HttpClient} from "@angular/common/http";
import {CitiesService} from "../../Services/cities.service";
import {City} from "../../Models/city";
import {CityCardAddComponent} from "../../UI/city-card-add/city-card-add.component";
import {CityCardComponent} from "../../UI/city-card/city-card.component";
import {NgFor, NgIf} from "@angular/common";
import {firstValueFrom} from "rxjs";
import {WeatherService} from "../../../weather-info/Services/weather.service";
import {CityLocation} from "../../../weather-info/Models/cityLocation";
import {WeatherResponse} from "../../../weather-info/Models/weatherResponse";
import {Router} from "@angular/router";
import {ConfirmationDialogComponent} from "../../../shared/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-cities-list',
  standalone: true,
  imports: [
    CityCardAddComponent,
    CityCardComponent,
    NgFor,
    ConfirmationDialogComponent,
    NgIf,
  ],
  templateUrl: './cities-list.component.html',
  styleUrl: './cities-list.component.css'
})
export class CitiesListComponent {
  citiesService = inject(CitiesService);
  weatherService = inject(WeatherService);
  authenticationService = inject(AuthService);

  cityWithWeather: Array<{ city: City, weather: WeatherResponse }> = [];
  showConfirmationDialog = false;
  selectedCityId: number = 0;

  openConfirmationDialog(cityId: number) {
    this.selectedCityId = cityId;
    this.showConfirmationDialog = true;
  }

  onConfirmation(confirmed: boolean) {
    if (confirmed) {
      this.deleteCity(this.selectedCityId);
    }
    this.showConfirmationDialog = false;
  }

  addNewCity(cityName: string): void {
    this.citiesService.addCity(cityName).subscribe(
      {
        next: (res) => {
          if (!res.success) {
            alert(res.message);
          }
          this.getCitiesData();
        }
      });
  }

  deleteCity(cityId: number): void {
    this.citiesService.deleteCity(cityId).subscribe(
      {
        next: (res) => {
          if (!res.success) {
            alert(res.message);
          }
          this.getCitiesData();
        }
      });
  }


  editCity(cityId: number): void {
    let cityWeather = this.cityWithWeather.find(cw => cw.city.id === cityId);
    if (cityWeather) {
      this.citiesService.editCity(cityWeather.city).subscribe(
        {
          next: (res) => {
            if (!res.success) {
              alert(res.message)
            }
            this.getCitiesData();
          }
        });
    }
  }

  getCitiesData(): void {
    this.cityWithWeather = [];
    this.citiesService.getCities().subscribe(
      cities => {
        for (let city of cities) {
          this.weatherService.getWeather({
            name: city.cityName,
            lat: city.lat,
            lon: city.lon
          }).subscribe(
            weather => {
              this.cityWithWeather.push({city, weather});
            });
        }
      });
  }

  ngOnInit(): void {
    if (this.authenticationService.currentUserSig()?.token) {
      this.getCitiesData();
    }
  }
}
