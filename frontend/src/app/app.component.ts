import {Component, inject} from '@angular/core';
import {Router, RouterModule, RouterOutlet} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./authorization/Services/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, HttpClientModule, NgIf],
  template: `
    <header>
      <div class="header-left">
        <h1><a routerLink="/">Weather App</a></h1>
      </div>
      <div class="header-right">
        <div *ngIf="authService.currentUserSig() === null">
          <a routerLink="/login">Login</a>
          <a routerLink="/register">Register</a>
        </div>
        <div *ngIf="authService.currentUserSig()?.token">
          <span (click)="logout()">Logout</span>
        </div>
      </div>
    </header>
    <main>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  authService = inject(AuthService);
  router = inject(Router)

  logout(): void {
    this.authService.logoutUser();
    this.router.navigateByUrl('/');
  }

  title = 'frontend';
}
