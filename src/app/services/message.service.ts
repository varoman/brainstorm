import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Message } from '../interfaces/message.model';
import { ResponseMessage } from '../interfaces/response-message.interface';

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  private url = `${environment.host}/api/messages`;

  constructor(private http: HttpClient) { }

  getMessagesByTopic(topicId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.url}?topic=${topicId}`);
  }

  submitMessage(message: Message): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(`${this.url}/add`, message);
  }
}
