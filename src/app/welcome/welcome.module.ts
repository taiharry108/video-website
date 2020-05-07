import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowListComponent } from './show-list/show-list.component';
import { FeaturedListComponent } from './featured-list/featured-list.component';
import { SubNewsletterComponent } from './sub-newsletter/sub-newsletter.component';
import { InsideCarouselComponent } from './featured-list/inside-carousel/inside-carousel.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ShowListComponent,
    FeaturedListComponent,
    SubNewsletterComponent,
    InsideCarouselComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [
    ShowListComponent,
    FeaturedListComponent,
    SubNewsletterComponent,
    InsideCarouselComponent,
  ],
})
export class WelcomeModule {}
