import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  state,
  AnimationBuilder,
  AnimationPlayer,
  AnimationFactory,
  query,
} from '@angular/animations';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  // animations: [
  //   trigger('carouselAnimation', [
  //     transition('* => void', [
  //       animate('300ms', style({ transform: 'translateX(-100%)' })),
  //     ]),
  //     transition('void => *', [
  //       style({ transform: 'translateX(100%)' }),
  //       animate('300ms'),
  //     ]),
  //   ]),
  // ],
})
export class CarouselComponent implements OnInit, AfterViewInit {
  slides = [{ src: 'assets/banner/gintama.jpg' }, { src: 'assets/banner/kaguyasama.jpg' }];
  @ViewChild('carousel') carousel: ElementRef;
  private player: AnimationPlayer;
  constructor(private animationBuilder: AnimationBuilder) {}
  currentSlide: number;

  ngOnInit(): void {
    this.currentSlide = 0;
    this.preloadImages();
  }

  ngAfterViewInit(): void {}

  createPlayer(currentPos: number, nextPos: number) {
    if (this.player) this.player.destroy();
    
    console.log(currentPos, nextPos);

    let animationFactory = this.animationBuilder.build([
      query('div', [
        style({ transform: `translateX(${currentPos}%)` }),
        animate('300ms', style({ transform: `translateX(${nextPos}%)` })),
      ]),
    ]);

    this.player = animationFactory.create(this.carousel.nativeElement);
  }

  preloadImages() {
    for (const slide of this.slides) {
      new Image().src = slide.src;
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
    if (this.currentSlide + 1 < this.slides.length) {
      const nextPos = currentPos - 100;
      this.createPlayer(currentPos, nextPos);
      this.player.play();
      this.currentSlide += 1;
    }
  }
}
