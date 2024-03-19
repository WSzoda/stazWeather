import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CityPost} from "../../Models/cityPost";

@Component({
  selector: 'app-city-card-add',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './city-card-add.component.html',
  styleUrl: './city-card-add.component.css'
})
export class CityCardAddComponent {
  @Output()
  addNewCity: EventEmitter<CityPost> = new EventEmitter<CityPost>();
  city: string = '';

  onSubmit(): void {
    this.addNewCity.emit({cityName: this.city} as CityPost);
    this.city = '';
  }
}
