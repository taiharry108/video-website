import { Injectable, Type } from '@angular/core';
import { AuthData } from './auth-data.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../ui/ui.actions';
import { AngularFireAuth } from '@angular/fire/auth';
import * as Auth from './auth.actions';
import { UiService } from '../ui/ui.service';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private store: Store<fromRoot.State>,
    private uiService: UiService
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((user: User) => {
      if (user) {
        console.log(user);
        if (user.emailVerified === true)
          this.store.dispatch(new Auth.SetAuthenticated());
        else {
          user.sendEmailVerification().then(() => {
            console.log('v email sent, gonna dispatch');
            this.store.dispatch(new Auth.DisplayVerificationEmailSent(true));
          });
          this.logout();
        }
      } else {
        this.store.dispatch(new Auth.SetUnauthenticated());
      }
    });
  }

  logout(): void {
    this.afAuth.signOut();
  }

  login(authData: AuthData): void {
    this.store.dispatch(new UI.StartLoading());
    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.store.dispatch(new UI.StopLoading());
      })
      .catch((error) => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  registerUser(authData: AuthData): void {
    this.store.dispatch(new UI.StartLoading());

    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => this.store.dispatch(new UI.StopLoading()))
      .catch((error) => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }
}
