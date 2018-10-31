import { Component, OnInit } from '@angular/core';

import { Message } from '../../interfaces/message.model';
import { MessageService } from '../../services/message.service';
import { Topic } from '../../interfaces/topic.interface';
import { TopicService } from '../../services/topic.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  providers: [MessageService]
})

export class MessagesComponent implements OnInit {

  public message = new Message('', '');
  public messages: Message[];
  private topic: Topic;

  constructor(private topicService: TopicService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.listenTopicChanges();
  }

  listenTopicChanges(): void {
    this.topicService.onTopicChange.subscribe((topic: Topic) => {
      this.message.topic = topic.id;
      this.getMessages(topic.id);
    });
  }

  getMessages(topicId: string): void {
    this.messageService.getMessagesByTopic(topicId)
      .subscribe((messages: Message[]) => {
        this.messages = messages;
      });
  }

  onMessageSubmit() {
    this.messageService.submitMessage(this.message).subscribe(() => {
      this.message.content = '';
      this.getMessages(this.message.topic);
    });
  }

}
