import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  isLoading$: Observable<boolean>;
  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.signupForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
      agree: new FormControl('', {
        validators: [Validators.requiredTrue]
      })
    });
  }

  onSubmit(): void {
    this.authService.registerUser({
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
    });
  }

  get password() {
    return this.signupForm.get('password');
  }
}
