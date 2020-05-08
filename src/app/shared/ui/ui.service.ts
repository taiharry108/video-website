import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as UI from './ui.actions';
@Injectable({
  providedIn: 'root',
})
export class UiService {
  constructor(
    private snackbar: MatSnackBar,
    private breakpointObserver: BreakpointObserver,
    private store: Store<fromRoot.State>
  ) {}

  private _isLoading: boolean;

  initUiService(): void {    
    this.store.select(fromRoot.getIsLoading).subscribe(isLoading => this._isLoading = isLoading);
  }

  bpObserveLtLg(): Observable<BreakpointState> {
    return this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
    ]);
  }

  bpObserveLtMd(): Observable<BreakpointState> {
    return this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
    ]);
  }

  showSnackbar(message, action, duration) {
    this.snackbar.open(message, action, { duration: duration });
  }

  startLoading(): void {
    this.store.dispatch(new UI.StartLoading());
  }

  stopLoading(): void {
    this.store.dispatch(new UI.StopLoading());
  }

  get isLoading(): boolean {
    return this._isLoading;
  }
}
