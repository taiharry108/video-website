import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  InjectionToken,
  OnDestroy,
} from '@angular/core';
import {
  style,
  animate,
  AnimationBuilder,
  AnimationPlayer,
  query,
} from '@angular/animations';
import { CarouselRef } from './carousel-ref';
import { Portal } from '@angular/cdk/portal';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

export const CONTAINER_DATA = new InjectionToken<{}>('CONTAINER_DATA');
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit, AfterViewInit, OnDestroy {
  portals: Portal<any>[];
  imgs: string[] = [
    'assets/banner/gintama.jpg',
    'assets/banner/kaguyasama.jpg',
  ];
  @ViewChild('carousel') carousel: ElementRef;

  private player: AnimationPlayer;
  constructor(
    private animationBuilder: AnimationBuilder,
    private carouselRef: CarouselRef,
    private breakpointObserver: BreakpointObserver
  ) {}
  currentSlide: number;
  isLtMd: boolean;
  bpObserverSub: Subscription;

  ngOnInit(): void {
    this.portals = this.carouselRef.portals;
    this.currentSlide = 0;
    this.preloadImages();

    this.bpObserverSub = this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe((result) => (this.isLtMd = result.matches));
  }

  ngAfterViewInit(): void {}

  createPlayer(currentPos: number, nextPos: number) {
    if (this.player) this.player.destroy();

    console.log(currentPos, nextPos);

    let animationFactory = this.animationBuilder.build([
      query('div.carousel-slide', [
        style({ transform: `translateX(${currentPos}%)` }),
        animate('300ms', style({ transform: `translateX(${nextPos}%)` })),
      ]),
    ]);

    this.player = animationFactory.create(this.carousel.nativeElement);
  }

  preloadImages() {
    for (const img of this.imgs) {
      new Image().src = img;
    }
  }

  onPrevClick(): void {
    const currentPos = this.currentSlide * -100;
    console.log(this.currentSlide);
    if (this.currentSlide > 0) {
      const nextPos = currentPos + 100;
      this.createPlayer(currentPos, nextPos);
      this.player.play();
      this.currentSlide -= 1;
    }
  }

  onNextClick(): void {
    const currentPos = this.currentSlide * -100;
    console.log(this.currentSlide);
    if (this.currentSlide + 1 < this.imgs.length) {
      const nextPos = currentPos - 100;
      this.createPlayer(currentPos, nextPos);
      this.player.play();
      this.currentSlide += 1;
    }
  }

  ngOnDestroy(): void {
    this.bpObserverSub.unsubscribe();
  }
}
