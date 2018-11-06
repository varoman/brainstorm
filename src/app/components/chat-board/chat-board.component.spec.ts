import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBoardComponent } from './chat-board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesComponent } from '../messages/messages.component';
import { MatDialog } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ChatBoardComponent', () => {
  let component: ChatBoardComponent;
  let fixture: ComponentFixture<ChatBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatBoardComponent, MessagesComponent ],
      imports: [
        ReactiveFormsModule, FormsModule, RouterTestingModule,
        HttpClientTestingModule],
      providers: [{ provide: MatDialog, useValue: {} }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
