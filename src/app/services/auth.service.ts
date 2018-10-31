import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { CredentialsInterface } from '../interfaces/credentials.interface';
import { ResponseMessage } from '../interfaces/response-message.interface';
import { Token } from '../interfaces/token.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  private url = `${environment.host}/api/auth`;

  signUp(user: User): Observable<Token> {
    return this.http.post<Token>(
      `${this.url}/signup`, user);
  }

  login(credentials: CredentialsInterface): Observable<Token> {
    return this.http.post<Token>(
      `${this.url}/login`, credentials);
  }

  checkAuthentication(): Observable<ResponseMessage> {
    return this.http.get<ResponseMessage>(
      `${this.url}/check-authentication`);
  }

}
