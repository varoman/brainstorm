import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomValidators } from '../../validators/validators';
import { AuthService } from '../../services/auth.service';
import { Token } from '../../interfaces/token.interface';

const { match } = CustomValidators;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignUpComponent implements OnInit, OnDestroy {

  public signUpForm: FormGroup;
  private subscription = new Subscription();

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)]),
      confirmPassword: new FormControl('', [
        Validators.required,
        match.bind(null, this, 'password', 'confirmPassword')])
    });
  }

  onSignUpFormSubmit(): void {
    const subscription = this.authService.signUp(this.signUpForm.value)
      .subscribe((token: Token) => {
        localStorage.setItem('token', token.token);
        this.router.navigate(['home']);
      });
    this.subscription.add(subscription);
  }

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

}
