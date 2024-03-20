import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../../Models/user";
import {Router} from "@angular/router";
import {AuthService} from "../../Services/auth.service";
import {RegisterForm} from "../../Models/registerForm";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  fb = inject(FormBuilder)
  authService = inject(AuthService)

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  });

  onSubmit(): void {
    this.authService.registerUser(this.form.getRawValue() as RegisterForm)
  }
}
