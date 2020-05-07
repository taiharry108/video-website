import { Component, OnInit } from '@angular/core';
import { InsideCarouselRef } from './inside-carousel-ref';
import { Router } from '@angular/router';
import { UiService } from 'src/app/ui/ui.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './inside-carousel.component.html',
  styleUrls: ['./inside-carousel.component.scss'],
})
export class InsideCarouselComponent implements OnInit {
  constructor(
    private insideCarouselRef: InsideCarouselRef,
    private router: Router,
    private uiService: UiService
  ) {}
  header: string;
  subheader: string;
  showId: string;
  isLtLg: boolean;

  bpObSub: Subscription;
  ngOnInit(): void {
    this.header = this.insideCarouselRef.data.header;
    this.subheader = this.insideCarouselRef.data.subheader;
    this.showId = this.insideCarouselRef.data.showId;
    this.bpObSub = this.uiService
      .bpObserveLtMd()
      .subscribe((result) => {
        this.isLtLg = result.matches;
      });
  }

  goto(): void {
    this.router.navigate([`show/${this.showId}`]);
  }
}
