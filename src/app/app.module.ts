import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './navigation/header/header.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { reducers } from './app.reducer';
import { SearchBarComponent } from './feature/search/search-bar/search-bar.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { SearchService } from './feature/search/search.service';
import { SearchResultComponent } from './feature/search/search-result/search-result.component';
import { ShowListComponent } from './show-list/show-list.component';
import { VjsPlayerComponent } from './video-player/vjs-player/vjs-player.component';
import { OverlayComponent } from './video-player/overlay/overlay.component';
import { OverlayDirective } from './overlay/overlay.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeComponent,
    SearchBarComponent,
    SearchResultComponent,
    ShowListComponent,
    VjsPlayerComponent,
    OverlayComponent,
    OverlayDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    MaterialModule,
    FlexLayoutModule,
    StoreModule.forRoot(reducers),
    ReactiveFormsModule,
    FormsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [SearchService],
  bootstrap: [AppComponent],
  entryComponents: [OverlayComponent],
})
export class AppModule {}
