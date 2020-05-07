import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SearchBarComponent } from './feature/search/search-bar/search-bar.component';
import { SearchResultComponent } from './feature/search/search-result/search-result.component';
import { RatingComponent } from './feature/rating/rating.component';
import { CarouselComponent } from './ui/carousel/carousel.component';

import { SearchService } from './feature/search/search.service';
import { CarouselService } from './ui/carousel/carousel.service';

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MaterialModule,
  FlexLayoutModule,
];

@NgModule({
  declarations: [
    SearchBarComponent,
    SearchResultComponent,
    RatingComponent,
    CarouselComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    SearchBarComponent,
    SearchResultComponent,
    RatingComponent,
    CarouselComponent,
  ],
  providers: [SearchService, CarouselService],
})
export class SharedModule {}
