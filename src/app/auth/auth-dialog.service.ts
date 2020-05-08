import { Injectable, Type } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as Auth from './auth.actions';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { Observable, Subscription } from 'rxjs';
import { SignupComponent } from './signup/signup.component';
import { UiService } from '../shared/ui/ui.service';

enum DialogRefType {
  Login,
  Signup,
  None,
}

@Injectable({
  providedIn: 'root',
})
export class AuthDialogService {
  constructor(
    private store: Store<fromRoot.State>,
    private dialog: MatDialog,
    private uiService: UiService
  ) {}

  isAuthenticated$: Observable<boolean>;
  authSub: Subscription;
  dialogCloseSub: Subscription;
  private dRefType: DialogRefType;
  private dialogRef: MatDialogRef<any, any>;

  initAuthListener(): void {
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuth);
  }

  openLoginDialog(): void {
    if (this.authSub) this.authSub.unsubscribe();
    this.dRefType = DialogRefType.Login;
    this.dialogRef = this.dialog.open(LoginComponent, {
      width: '500px',
      panelClass: 'zero-padding-dialog',
    });

    this.authSub = this.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        {
          this.dialogRef.close();
          this.uiService.showSnackbar('Login Successful!', null, 10000);
        }
      }
    });

    this.resetDisplayVEmail();
  }

  openSignupDialog(): void {
    this.dRefType = DialogRefType.Signup;
    this.dialogRef = this.dialog.open(SignupComponent, {
      width: '500px',
      panelClass: 'zero-padding-dialog',
    });

    this.resetDisplayVEmail();
  }

  resetDisplayVEmail(): void {
    if (this.dialogCloseSub) this.dialogCloseSub.unsubscribe();
    this.dialogCloseSub = this.dialogRef
      .afterClosed()
      .subscribe(() =>
        this.store.dispatch(new Auth.DisplayVerificationEmailSent(false))
      );
  }

  get diagRefType(): DialogRefType {
    return this.dRefType;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
