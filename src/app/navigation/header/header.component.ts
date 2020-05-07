import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { SearchService } from '../../shared/feature/search/search.service';
import { AuthService } from 'src/app/auth/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../../auth/login/login.component';
import { SignupComponent } from 'src/app/auth/signup/signup.component';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as Auth from '../../auth/auth.actions';
import { UiService } from '../../shared/ui/ui.service';

enum DialogRefType {
  Login,
  Signup,
  None,
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  dialogCloseSub: Subscription;
  displayVEmailSub: Subscription;
  dialogRef: MatDialogRef<any, any>;
  dRefType: DialogRefType;

  authSub: Subscription;
  constructor(
    private searchService: SearchService,
    private authService: AuthService,
    private dialog: MatDialog,
    private store: Store<fromRoot.State>,
    private uiService: UiService
  ) {}

  isAuthenticated$: Observable<boolean>;

  ngOnInit(): void {
    this.dRefType = DialogRefType.None;
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuth);

    this.displayVEmailSub = this.store
      .select(fromRoot.getDisplayVEmailSent)
      .subscribe((display) => {
        if (display) {
          if (this.dRefType == DialogRefType.Signup) this.dialogRef.close();
          this.uiService.showSnackbar(
            'Please verify your email by clicking the link in the verification email sent to you. Sign in again after your verify email.',
            null,
            10000
          );
        }
      });
  }

  resetDisplayVEmail(): void {
    if (this.dialogCloseSub) this.dialogCloseSub.unsubscribe();
    this.dialogCloseSub = this.dialogRef
      .afterClosed()
      .subscribe(() =>
        this.store.dispatch(new Auth.DisplayVerificationEmailSent(false))
      );
  }

  onToggleSidenav(): void {}

  searchBarOnEnter(searchValue: string) {
    this.searchService.searchShow(searchValue);
  }

  ngAfterViewInit(): void {}

  openLoginDialog(): void {
    this.dRefType = DialogRefType.Login;
    this.dialogRef = this.dialog.open(LoginComponent, {
      width: '500px',
      panelClass: 'zero-padding-dialog',
    });

    this.authSub = this.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.dialogRef.close();
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

  signout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.dialogCloseSub.unsubscribe();
    this.authSub.unsubscribe();
    this.displayVEmailSub.unsubscribe();
  }
}
