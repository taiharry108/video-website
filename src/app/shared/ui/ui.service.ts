import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  constructor(
    private snackbar: MatSnackBar,
    private breakpointObserver: BreakpointObserver
  ) {}

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
}
