import { HttpInterceptor, HttpRequest, HttpHandler} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { catchError} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { throwError} from 'rxjs';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(req)
      .pipe(catchError((error): Observable<any> => {
        if (error.status === 401) {
          this.router.navigate(['/']);
          throwError(error);
        }
        if (error.error)
          alert(error.error.message)
        return next.handle(req);
      }));
  }
}
