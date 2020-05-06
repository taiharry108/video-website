import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MaterialModule,
  FlexLayoutModule,
];

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules,
})
export class SharedModule {}
