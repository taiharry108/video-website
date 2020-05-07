import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VjsPlayerComponent } from './vjs-player/vjs-player.component';
import { OverlayComponent } from './overlay/overlay.component';
import { OverlayDirective } from './overlay/overlay.directive';
import { PlaylistComponent } from './playlist/playlist.component';
import { EpContentComponent } from './ep-content/ep-content.component';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';
import { VideoPlayerRoutingModule } from './video-player-routing.module';

@NgModule({
  declarations: [
    VjsPlayerComponent,
    OverlayComponent,
    OverlayDirective,
    PlaylistComponent,
    EpContentComponent,
    MainComponent,
  ],
  imports: [CommonModule, SharedModule, VideoPlayerRoutingModule],
  exports: [],
  entryComponents: [OverlayComponent],
})
export class VideoPlayerModule {}
