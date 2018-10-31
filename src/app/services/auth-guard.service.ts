import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { ResponseMessage } from '../interfaces/response-message.interface';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private router: Router,
                private authService: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean> | boolean {
        if (!environment.production) return true;
        return this.authService.checkAuthentication()
            .pipe(map((res: ResponseMessage) => {
                if (res.message === 'ok')
                    return true;
              alert('You should be authenticated to view this page');
              this.router.navigate(['/']);
                return false;
            }));
    }
}
