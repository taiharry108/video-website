import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const modules = [MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule];

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules,  
})
export class MaterialModule {}
