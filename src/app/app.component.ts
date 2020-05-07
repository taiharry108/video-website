import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ShowService } from './show/show.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'video-website';
  constructor(
    private authService: AuthService,
    private showService: ShowService
  ) {}
  ngOnInit(): void {
    // this.authService.initAuthListener();
    // this.showService.fetchLatestShow();
  }
}
