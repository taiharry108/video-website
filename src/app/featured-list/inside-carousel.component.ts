import { Component, OnInit } from '@angular/core';
import { InsideCarouselRef } from './inside-carousel-ref';

@Component({
  template: `<div class="carousel-details-container">
    <h2 class="header">{{ header }}</h2>
    <h3 class="sub-header">{{ subheader }}</h3>
  </div>`,
  styles: [
    '.carousel-details-container { position: absolute; color: white; bottom: 0; margin: 20px; width: 100%;}',
    '.sub-header { opacity: 0.7; font-weight: 200;}',
  ],
})
export class InsideCarouselComponent implements OnInit {
  constructor(private insideCarouselRef: InsideCarouselRef) {}
  header: string;
  subheader: string;
  ngOnInit(): void {
    this.header = this.insideCarouselRef.data.header;
    this.subheader = this.insideCarouselRef.data.subheader;
  }
}
