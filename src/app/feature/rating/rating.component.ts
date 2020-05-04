import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

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
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit {
  @Input() rating: Rating;
  @Input() isInteractive: boolean = true;
  quotient: number;
  remainder: number;
  constructor() {}

  ngOnInit(): void {
    this.quotient = Math.floor(this.rating / 2);
    this.remainder = this.rating % 2;
  }

  getIcon(idx: number): string {
    if (idx < this.quotient) return 'star';
    else {
      if (idx == this.quotient && this.remainder == 1) return 'star_half';
      else return 'star_outline';
    }
  }

  calRating(event: MouseEvent, idx: number) {
    if (!this.isInteractive)
      return;
    const el = event.currentTarget as HTMLElement;

    let x: number = event.pageX - el.offsetLeft;
    this.rating = idx * 2;
    if (x >= 27) this.rating += 2;
    else if (x >= 13) this.rating += 1;

    this.quotient = Math.floor(this.rating / 2);
    this.remainder = this.rating % 2;
  }
}
