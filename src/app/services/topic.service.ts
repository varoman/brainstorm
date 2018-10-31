import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { ResponseMessage } from '../interfaces/response-message.interface';
import { Topic } from '../interfaces/topic.interface';

@Injectable({
  providedIn: 'root'
})

export class TopicService {

  public onTopicChange = new BehaviorSubject(null);
  private url = `${environment.host}/api/topics`;

  constructor(private http: HttpClient) { }

  addTopic(topicData: Topic): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(`${this.url}/add`, topicData);
  }

  getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.url);
  }

}
