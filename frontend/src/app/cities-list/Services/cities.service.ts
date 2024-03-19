import {inject, Injectable} from '@angular/core';
import {City} from "../Models/city";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../authorization/Services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  authService = inject(AuthService)
  http = inject(HttpClient)

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

  addCity(city: City) : void {
    if(this.authService.currentUserSig()?.token) {
      this.http.post<void>('http://localhost:5202/cities', city).subscribe(response=> {
        console.log('city added');
      });
    }
  }
}
