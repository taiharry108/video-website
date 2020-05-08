import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { SearchService } from '../../shared/feature/search/search.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { UiService } from '../../shared/ui/ui.service';
import { Subscription } from 'rxjs';
import { AuthDialogService } from 'src/app/auth/auth-dialog.service';

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
  displayVEmailSub: Subscription;
  constructor(
    private searchService: SearchService,
    private authService: AuthService,
    private store: Store<fromRoot.State>,
    private uiService: UiService,
    private authDialogService: AuthDialogService
  ) {}

  ngOnInit(): void {
    this.displayVEmailSub = this.store
      .select(fromRoot.getDisplayVEmailSent)
      .subscribe((display) => {
        if (display) {
          if (this.authDialogService.diagRefType == DialogRefType.Signup)
            this.authDialogService.closeDialog();
          this.uiService.showSnackbar(
            'Please verify your email by clicking the link in the verification email sent to you. Sign in again after your verify email.',
            null,
            10000
          );
        }
      });
  }

  searchBarOnEnter(searchValue: string) {
    this.searchService.searchShow(searchValue);
  }

  ngAfterViewInit(): void {}

  //   resetDisplayVEmail(): void {
  //     if (this.dialogCloseSub) this.dialogCloseSub.unsubscribe();
  //     this.dialogCloseSub = this.dialogRef
  //       .afterClosed()
  //       .subscribe(() =>
  //         this.store.dispatch(new Auth.DisplayVerificationEmailSent(false))
  //       );
  //   }

  //   onToggleSidenav(): void {}

  // openLoginDialog(): void {
  //   this.dRefType = DialogRefType.Login;
  //   this.dialogRef = this.dialog.open(LoginComponent, {
  //     width: '500px',
  //     panelClass: 'zero-padding-dialog',
  //   });

  //   this.authSub = this.isAuthenticated$.subscribe((isAuthenticated) => {
  //     if (isAuthenticated) {
  //       this.dialogRef.close();
  //     }
  //   });

  //   this.resetDisplayVEmail();
  // }

  // openSignupDialog(): void {
  //   this.dRefType = DialogRefType.Signup;
  //   this.dialogRef = this.dialog.open(SignupComponent, {
  //     width: '500px',
  //     panelClass: 'zero-padding-dialog',
  //   });

  //   this.resetDisplayVEmail();
  // }

  signout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.displayVEmailSub.unsubscribe();
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }

  openLoginDialog(): void {
    this.authDialogService.openLoginDialog();
  }

  openSignupDialog(): void {
    this.authDialogService.openSignupDialog();
  }
}
