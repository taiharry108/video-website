import { Component, OnInit } from '@angular/core';
import { InsideCarouselRef } from './inside-carousel-ref';
import { Router } from '@angular/router';
import { UiService } from '../../../shared/ui/ui.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthDialogService } from 'src/app/auth/auth-dialog.service';

@Component({
  templateUrl: './inside-carousel.component.html',
  styleUrls: ['./inside-carousel.component.scss'],
})
export class InsideCarouselComponent implements OnInit {
  constructor(
    private insideCarouselRef: InsideCarouselRef,
    private router: Router,
    private uiService: UiService,
    private authService: AuthService,
    private authDialogService: AuthDialogService
  ) {}
  header: string;
  subheader: string;
  showId: string;
  isLtLg: boolean;

  bpObSub: Subscription;
  ngOnInit(): void {
    this.header = this.insideCarouselRef.featuredShow.header;
    this.subheader = this.insideCarouselRef.featuredShow.subheader;
    this.showId = this.insideCarouselRef.featuredShow.showId;
    this.bpObSub = this.uiService.bpObserveLtMd().subscribe((result) => {
      this.isLtLg = result.matches;
    });
  }

  goto(): void {
    if (this.authService.isAuthenticated)
      this.router.navigate([`show/${this.showId}`]);
    else this.authDialogService.openLoginDialog();
  }
}
