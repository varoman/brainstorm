import { SignUpComponent } from '../components/signup/signup.component';
import { MatchError } from '../interfaces/match-error.interface';

export class CustomValidators {

  static match (component: SignUpComponent, field1: string, field2: string):
    MatchError | null {
    if (component.signUpForm) {
      const value1: string = component.signUpForm.controls[field1].value;
      const value2: string = component.signUpForm.controls[field2].value;
      if (value1 !== value2) {
        return { matchErr: true};
      }
    }
    return null;
  }
}
