import {Component, EventEmitter, Input, Output} from '@angular/core';
import {City} from "../../Models/city";
import {WeatherResponse} from "../../../weather-info/Models/weatherResponse";
import {NgOptimizedImage} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faEdit} from '@fortawesome/free-regular-svg-icons';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-city-card',
  standalone: true,
  imports: [
    NgOptimizedImage,
    FontAwesomeModule
  ],
  templateUrl: './city-card.component.html',
  styleUrl: './city-card.component.css'
})
export class CityCardComponent {
  @Input({required: true})
  data!: { city: City, weather: WeatherResponse };

  @Output()
  deleteCity = new EventEmitter<number>();

  faEdit = faEdit;
  faTrash = faTrash;
}
