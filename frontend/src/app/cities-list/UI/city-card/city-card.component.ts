import {Component, Input} from '@angular/core';
import {City} from "../../Models/city";

@Component({
  selector: 'app-city-card',
  standalone: true,
  imports: [],
  templateUrl: './city-card.component.html',
  styleUrl: './city-card.component.css'
})
export class CityCardComponent {
  @Input({required: true})
  city!: City;
}
