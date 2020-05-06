import {
  Component,
  OnInit,
  OnDestroy,
  TemplateRef,
  AfterViewInit,
  Injector,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import { Subscription, Observable } from 'rxjs';
import { Show } from '../video-player/show.model';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { CarouselComponent } from '../ui/carousel/carousel.component';
import { CarouselService } from '../ui/carousel/carousel.service';
import { InsideCarouselComponent } from './inside-carousel/inside-carousel.component';
import { InsideCarouselRef, Data } from './inside-carousel/inside-carousel-ref';

@Component({
  selector: 'app-featured-list',
  templateUrl: './featured-list.component.html',
  styleUrls: ['./featured-list.component.scss'],
})
export class FeaturedListComponent implements OnInit, OnDestroy, AfterViewInit {
  templateArr: TemplateRef<HTMLElement>[];
  featuredShowsSub: Subscription;
  featuredShows: Show[];
  componentPortal: ComponentPortal<CarouselComponent>;

  constructor(
    private store: Store<fromRoot.State>,
    private cdr: ChangeDetectorRef,
    private carouselService: CarouselService,
    private injector: Injector
  ) {}

  imgs: string[];
  content: Data[] = [
    {
      header: 'Gintama is coming back in 3 Days!',
      subheader: 'Available in Japanese | English',
      showId: '1',
    },
    {
      header: 'New episode of Kaguya-sama is out!',
      subheader: 'Available in Japanese | English',
      showId: '2',
    },
  ];

  createInjector(
    insideCarouselRef: InsideCarouselRef,
    injector: Injector
  ): PortalInjector {
    const injectorTokens = new WeakMap([
      [InsideCarouselRef, insideCarouselRef],
    ]);
    return new PortalInjector(injector, injectorTokens);
  }

  ngAfterViewInit() {
    this.componentPortal = this.carouselService.getPortal<
      Data,
      InsideCarouselComponent,
      InsideCarouselRef
    >(this.content, InsideCarouselComponent, InsideCarouselRef);
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.featuredShowsSub = this.store
      .select(fromRoot.getFeaturedShows)
      .subscribe((shows: Show[]) => {
        this.featuredShows = shows;
        this.imgs = shows.map((show) => show.bannerImgUrl);
      });
  }

  ngOnDestroy(): void {
    this.featuredShowsSub.unsubscribe();
  }
}
