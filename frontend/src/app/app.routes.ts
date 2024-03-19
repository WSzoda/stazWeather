import {Routes} from '@angular/router';
import {CitiesListComponent} from "./cities-list/Pages/main/cities-list.component";
import {LoginComponent} from "./authorization/Pages/login/login.component";
import {RegisterComponent} from "./authorization/Pages/register/register.component";

export const routes: Routes = [
  {
    path: '',
    component: CitiesListComponent,
    title: "Home List"
  },
  {
    path: "login",
    component: LoginComponent,
    title: "Login Page"
  },
  {
    path: "register",
    component: RegisterComponent,
    title: "Register Page"
  },
];
