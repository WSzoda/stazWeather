import {HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "../Services/auth.service";
import {User} from "../Models/user";

@Injectable()
export class authInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token') ?? '';
    let request = req.clone({
      setHeaders: {
        Authorization: token ? `Bearer ${token}`: ''
      }
    });
    return next.handle(request);
  }
}
