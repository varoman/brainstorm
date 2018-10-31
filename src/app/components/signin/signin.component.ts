import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { Token } from '../../interfaces/token.interface';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SignInComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  private subscriptions = new Subscription();

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onLoginFormSubmit(): void {
    const subscription = this.authService.login(this.loginForm.value)
      .subscribe((token: Token) => {
        if (!token) return;
        this.router.navigate(['home']);
        localStorage.setItem('token', token.token);
      });
    this.subscriptions.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
