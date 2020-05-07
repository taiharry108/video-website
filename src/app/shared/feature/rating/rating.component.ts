import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Show } from 'src/app/video-player/show.model';

export enum Rating {
  Zero,
  ZeroH,
  One,
  OneH,
  Two,
  TwoH,
  Three,
  ThreeH,
  Four,
  FourH,
  Five,
}
@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit, AfterViewInit {
  @Input() rating: Rating;
  @Input() isInteractive: boolean = true;
  quotient: number;
  ogQuotient: number;
  remainder: number;
  ogRemainder: number;
  constructor() {}

  ngOnInit(): void {
    this.ogQuotient = this.quotient = Math.floor(this.rating / 2);
    this.ogRemainder = this.remainder = this.rating % 2;
  }

  ngAfterViewInit(): void {
  }

  getIcon(idx: number): string {
    if (idx < this.quotient) return 'star';
    else {
      if (idx == this.quotient && this.remainder == 1) return 'star_half';
      else return 'star_outline';
    }
  }

  calRating(event: MouseEvent, idx: number): void {
    if (!this.isInteractive) return;
    const el = event.currentTarget as HTMLElement;

    let x: number = event.pageX - el.offsetLeft;
    this.rating = idx * 2;
    if (x >= 27) this.rating += 2;
    else if (x >= 13) this.rating += 1;

    this.quotient = Math.floor(this.rating / 2);
    this.remainder = this.rating % 2;
  }

  resetRating(): void {
    this.quotient = this.ogQuotient;
    this.remainder = this.ogRemainder;
  }
}
