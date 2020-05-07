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
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { VjsPlayerComponent } from './video-player/vjs-player/vjs-player.component';
import { OverlayComponent } from './video-player/overlay/overlay.component';
import { OverlayDirective } from './video-player/overlay/overlay.directive';
import { PlaylistComponent } from './video-player/playlist/playlist.component';
import { EpContentComponent } from './video-player/ep-content/ep-content.component';
import { MainComponent } from './video-player/main/main.component';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { WelcomeModule } from './welcome/welcome.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeComponent,
    VjsPlayerComponent,
    OverlayComponent,
    OverlayDirective,
    PlaylistComponent,
    EpContentComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    StoreModule.forRoot(reducers),
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
    // ReactiveFormsModule,
    // FormsModule,
    SharedModule,
    WelcomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [OverlayComponent],
})
export class AppModule {}
