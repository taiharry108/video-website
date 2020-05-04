import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
  TemplateRef,
  Inject,
  InjectionToken,
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

export const CONTAINER_DATA = new InjectionToken<{}>('CONTAINER_DATA');
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit, AfterViewInit {

  portals: Portal<any>[];
  imgs: string[] = ['assets/banner/gintama.jpg', 'assets/banner/kaguyasama.jpg'];
  @ViewChild('carousel') carousel: ElementRef;

  private player: AnimationPlayer;
  constructor(
    private animationBuilder: AnimationBuilder,
    private carouselRef: CarouselRef
  ) {}
  currentSlide: number;

  ngOnInit(): void {
    this.portals = this.carouselRef.portals;
    this.currentSlide = 0;
    this.preloadImages();
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
    if (this.currentSlide > 0) {
      const nextPos = currentPos + 100;
      this.createPlayer(currentPos, nextPos);
      this.player.play();
      this.currentSlide -= 1;
    }
  }

  onNextClick(): void {
    const currentPos = this.currentSlide * -100;
    if (this.currentSlide + 1 < this.imgs.length) {
      const nextPos = currentPos - 100;
      this.createPlayer(currentPos, nextPos);
      this.player.play();
      this.currentSlide += 1;
    }
  }
}
