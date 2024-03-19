import {Component, inject} from '@angular/core';
import {AuthService} from "../../../authorization/Services/auth.service";
import {HttpClient} from "@angular/common/http";
import {CitiesService} from "../../Services/cities.service";
import {City} from "../../Models/city";
import {CityCardAddComponent} from "../../UI/city-card-add/city-card-add.component";
import {CityCardComponent} from "../../UI/city-card/city-card.component";
import {NgFor} from "@angular/common";

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
export class CitiesListComponent{
  citiesService = inject(CitiesService)
  cities: City[] = [];

  addNewCity(city: City): void{
    this.citiesService.addCity(city);
    console.log(city.cityName);
  }

  async ngOnInit(): Promise<void> {
    this.cities = await this.citiesService.getCities();
  }
}
