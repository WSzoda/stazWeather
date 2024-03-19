import {inject, Injectable, signal} from '@angular/core';
import {User} from "../Models/user";
import {RegisterForm} from "../Models/registerForm";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginForm} from "../Models/loginForm";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserSig = signal<User | undefined | null>(undefined);
  http = inject(HttpClient)

  constructor() {
    const token = localStorage.getItem('token');
    if(token)
    {
      this.currentUserSig.set({token} as User);
    } else {
      this.currentUserSig.set(null);
    }
  }

  registerUser(data: RegisterForm): void {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    this.http.post<User>('http://localhost:5202/account/register', data, {
      headers: headers
    })
  }

  loginUser(data: LoginForm): void {
    this.http.post<User>('http://localhost:5202/account/login', data, {
      responseType: 'json'
    })
      .subscribe(response => {
        localStorage.setItem('token', response.token);
        this.currentUserSig.set(response);
      });
  }

  logoutUser(): void {
    this.currentUserSig.set(null);
    localStorage.removeItem('token');
  }
}
