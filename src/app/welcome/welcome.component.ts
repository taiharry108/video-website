import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import { Subscription, Observable } from 'rxjs';
import { Show } from '../video-player/show.model';
import * as Video from '../video-player/video.actions';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ShowService } from '../show/show.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor(private showService: ShowService) {}

  ngOnInit(): void {    
    this.showService.updateShows();
  }
}
