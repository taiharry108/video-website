import { Component, OnInit } from '@angular/core';
import { InsideCarouselRef } from './inside-carousel-ref';
import { Router } from '@angular/router';

@Component({
  templateUrl: './inside-carousel.component.html',
  styleUrls: ['./inside-carousel.component.scss'],
})
export class InsideCarouselComponent implements OnInit {
  constructor(private insideCarouselRef: InsideCarouselRef, private router: Router) {}
  header: string;
  subheader: string;
  showId: string;
  ngOnInit(): void {
    this.header = this.insideCarouselRef.data.header;
    this.subheader = this.insideCarouselRef.data.subheader;
    this.showId = this.insideCarouselRef.data.showId;
  }

  goto(): void {
    this.router.navigate([`show/${this.showId}`]);
  }
}
