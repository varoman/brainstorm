import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { AddTopicModalComponent } from '../add-topic-modal/add-topic-modal.component';
import { Topic } from '../../interfaces/topic.interface';
import { TopicService } from '../../services/topic.service';

@Component({
  selector: 'app-chat-board',
  templateUrl: './chat-board.component.html',
  styleUrls: ['./chat-board.component.css']
})

export class ChatBoardComponent implements OnInit, OnDestroy {

  public topics: Topic[];
  public selectedTopic: Topic;
  private subscriptions = new Subscription();

  constructor(private dialog: MatDialog, private topicService: TopicService,
              private router: Router) { }

  ngOnInit() {
    this.getTopics();
  }

  getTopics(): void {
    this.topicService.getTopics().subscribe((topics: Topic[]) => {
      this.topics = topics;
    });
  }

  onTopicSelect(topic: Topic): void {
    this.selectedTopic = topic;
    this.topicService.onTopicChange.next(topic);
  }

  onOpenAddTopicDialog(): void {
    const dialogRef = this.dialog.open(AddTopicModalComponent);
    const dialogSubscription = dialogRef.afterClosed()
      .subscribe((result) => {
        if (!result) return;
      });
    this.subscriptions.add(dialogSubscription);
  }

  logOut(): void {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
