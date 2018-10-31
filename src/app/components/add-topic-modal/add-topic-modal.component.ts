import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { Subscription } from 'rxjs';

import { ResponseMessage } from '../../interfaces/response-message.interface';
import { TopicService } from '../../services/topic.service';

@Component({
  selector: 'app-add-topic-modal',
  templateUrl: './add-topic-modal.component.html',
  styleUrls: ['./add-topic-modal.component.css'],
})

export class AddTopicModalComponent implements OnInit, OnDestroy {

  public topicForm: FormGroup;
  public subscription = new Subscription();

  constructor(private dialogRef: MatDialogRef<AddTopicModalComponent>,
              private topicService: TopicService) { }

  ngOnInit() {
    this.topicForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  onTopicFormFormSubmit(): void {
    const subscription = this.topicService.addTopic(this.topicForm.value)
      .subscribe((response: ResponseMessage) => {
        this.dialogRef.close();
        alert(response.message);
      });
    this.subscription.add(subscription);
  }

  closeDialog(): void {
    this.dialogRef.close(null);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
