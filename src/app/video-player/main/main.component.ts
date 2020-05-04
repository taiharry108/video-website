import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Season } from '../show.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, OnDestroy {
  showId: string;
  paramMapSub: Subscription;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.paramMapSub = this.route.paramMap.subscribe((params) => {
      this.showId = params.get('showId');
    });
  }

  ngOnDestroy(): void {
    this.paramMapSub.unsubscribe();
  }
}
