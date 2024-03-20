import {Component, EventEmitter, Input, Output} from '@angular/core';
import {City} from "../../Models/city";
import {WeatherResponse} from "../../../weather-info/Models/weatherResponse";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faEdit} from '@fortawesome/free-regular-svg-icons';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-city-card',
  standalone: true,
  imports: [
    NgOptimizedImage,
    FontAwesomeModule,
    NgIf,
    FormsModule
  ],
  templateUrl: './city-card.component.html',
  styleUrl: './city-card.component.css'
})
export class CityCardComponent {
  @Input({required: true})
  data!: { city: City, weather: WeatherResponse };
  @Output()
  deleteCity = new EventEmitter<number>();
  @Output()
  editCity = new EventEmitter<number>();

  faEdit = faEdit;
  faTrash = faTrash;

  isEdited: boolean = false;
  nameBeforeEdit: string = '';

  handleEditButton(): void {
    if (!this.isEdited) {
      this.nameBeforeEdit = this.data.city.cityName;
    }
    if (this.isEdited) {
      this.sumbitEdit();
    }
    this.isEdited = !this.isEdited;
  }

  sumbitEdit(): void {
    if (this.data.city.cityName !== this.nameBeforeEdit) {
      this.editCity.emit(this.data.city.id);
    }
    this.nameBeforeEdit = '';
  }

}
