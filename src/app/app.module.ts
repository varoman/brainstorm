import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AuthGuardService } from './services/auth-guard.service';
import { ErrorHandlerInterceptor } from './interceptors/error_handler.interceptor';
import { HeadersInterceptor } from './interceptors/headers.interceptor';

import { AppComponent } from './app.component';
import { AddTopicModalComponent } from './components/add-topic-modal/add-topic-modal.component';
import { ChatBoardComponent } from './components/chat-board/chat-board.component';
import { MessagesComponent } from './components/messages/messages.component';
import { SignUpComponent } from './components/signup/signup.component';
import { SignInComponent } from './components/signin/signin.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    MessagesComponent,
    ChatBoardComponent,
    AddTopicModalComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    MatDialogModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [AddTopicModalComponent]
})
export class AppModule { }
