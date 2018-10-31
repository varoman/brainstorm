import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<Object>, next: HttpHandler):
    Observable<HttpEvent<Object>> {
    const token = localStorage.getItem('token') || '';
    const cloned = req.clone({
      withCredentials: true,
      setHeaders: {'Authorization': `JWT ${token}`}
    });
    return next.handle(cloned);
  }
}
