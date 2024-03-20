import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class authInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token') ?? '';
    if (req.url.startsWith('http://localhost:5202')) {
      const modifiedReq = req.clone({
        setHeaders: {
          Authorization: token ? `Bearer ${token}` : ''
        }
      });
      return next.handle(modifiedReq);
    }
    return next.handle(req);
  }
}
