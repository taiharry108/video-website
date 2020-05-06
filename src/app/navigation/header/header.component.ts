import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SearchService } from '../../feature/search/search.service';
import { AuthService } from 'src/app/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../auth/login/login.component';
import { SignupComponent } from 'src/app/auth/signup/signup.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  constructor(
    private searchService: SearchService,
    private authService: AuthService,
    private dialog: MatDialog,
    private store: Store<fromRoot.State>
  ) {}

  isAuthenticated$: Observable<boolean>

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuth);
  }

  onToggleSidenav(): void {}

  searchBarOnEnter(searchValue: string) {
    this.searchService.searchShow(searchValue);
  }

  ngAfterViewInit(): void {
    // const dialogRef = this.dialog.open(SignupComponent, { width: '500px' });
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, { width: '500px' });
  }

  openSignupDialog(): void {
    const dialogRef = this.dialog.open(SignupComponent, { width: '500px' });
  }
}
