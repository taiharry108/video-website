import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeComponent } from './welcome.component';
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
    WelcomeComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [
  ],
})
export class WelcomeModule {}
