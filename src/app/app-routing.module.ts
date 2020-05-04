import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { SearchResultComponent } from './feature/search/search-result/search-result.component';
import { MainComponent } from './video-player/main/main.component';


const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'show/:showId', component: MainComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {   
}
