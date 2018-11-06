import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTopicModalComponent } from './add-topic-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddTopicModalComponent', () => {
  let component: AddTopicModalComponent;
  let fixture: ComponentFixture<AddTopicModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [ AddTopicModalComponent ],
      providers: [{ provide: MatDialogRef, useValue: {} }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTopicModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
