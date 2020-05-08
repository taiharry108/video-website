import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ShowService } from './show/show.service';
import { AuthDialogService } from './auth/auth-dialog.service';
import { UiService } from './shared/ui/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'video-website';
  constructor(
    private authService: AuthService,
    private showService: ShowService,
    private authDialogService: AuthDialogService,
    private uiService: UiService
  ) {}
  ngOnInit(): void {
    this.authService.initAuthListener();
    this.authDialogService.initAuthListener();
    this.showService.fetchLatestShow();
    this.uiService.initUiService();
  }
}
