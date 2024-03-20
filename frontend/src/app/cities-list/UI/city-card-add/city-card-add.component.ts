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
  addNewCity: EventEmitter<string> = new EventEmitter<string>();
  city: string = '';

  onSubmit(): void {
    this.addNewCity.emit(this.city);
    this.city = '';
  }
}
