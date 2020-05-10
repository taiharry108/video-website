import {
  Component,
  OnInit,
  OnDestroy,
  TemplateRef,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { Subscription, Subject } from 'rxjs';
import { Show, FeaturedShow } from '../../video-player/show.model';
import { ComponentPortal } from '@angular/cdk/portal';
import { CarouselComponent } from '../../shared/ui/carousel/carousel.component';
import { CarouselService } from '../../shared/ui/carousel/carousel.service';
import { InsideCarouselComponent } from './inside-carousel/inside-carousel.component';
import { InsideCarouselRef } from './inside-carousel/inside-carousel-ref';
import { ShowService } from 'src/app/show/show.service';

@Component({
  selector: 'app-featured-list',
  templateUrl: './featured-list.component.html',
  styleUrls: ['./featured-list.component.scss'],
})
export class FeaturedListComponent implements OnInit, OnDestroy, AfterViewInit {
  templateArr: TemplateRef<HTMLElement>[];
  featuredShowsSub: Subscription;
  componentPortal: ComponentPortal<CarouselComponent>;

  constructor(
    private store: Store<fromRoot.State>,
    private cdr: ChangeDetectorRef,
    private carouselService: CarouselService,
    private showService: ShowService
  ) {}
  ngAfterViewInit() {
    this.featuredShowsSub = this.store
      .select(fromRoot.getFeaturedShows)
      .subscribe((shows: FeaturedShow[]) => {
        const imgs = shows.map((show) =>
          this.showService.getShowBannerImg(show.showId)
        );
        this.componentPortal = this.carouselService.getPortal<
          FeaturedShow,
          InsideCarouselComponent,
          InsideCarouselRef
        >(shows, InsideCarouselComponent, InsideCarouselRef, imgs);
        this.cdr.detectChanges();
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.featuredShowsSub.unsubscribe();
  }
}
