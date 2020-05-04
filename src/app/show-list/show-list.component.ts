import { Component, OnInit, Input } from '@angular/core';
import { Show } from '../video-player/show.model';

const fakeShows = [
  {
    name: 'Gintama',
    numEps: 10,
    numSeasons: 2,
    thumImgUrl: 'assets/gintama.jpg',
  },
  {
    name: 'Gintama',
    numEps: 10,
    numSeasons: 2,
    thumImgUrl: 'assets/gintama.jpg',
  },
  {
    name: 'Gintama',
    numEps: 10,
    numSeasons: 2,
    thumImgUrl: 'assets/gintama.jpg',
  },
  {
    name: 'Gintama',
    numEps: 10,
    numSeasons: 2,
    thumImgUrl: 'assets/gintama.jpg',
  },
  {
    name: 'Gintama',
    numEps: 10,
    numSeasons: 2,
    thumImgUrl: 'assets/gintama.jpg',
  },
  {
    name: 'Gintama',
    numEps: 10,
    numSeasons: 2,
    thumImgUrl: 'assets/gintama.jpg',
  },
  {
    name: 'Gintama',
    numEps: 10,
    numSeasons: 2,
    thumImgUrl: 'assets/gintama.jpg',
  },
  {
    name: 'Gintama',
    numEps: 10,
    numSeasons: 2,
    thumImgUrl: 'assets/gintama.jpg',
  },
];

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css'],
})
export class ShowListComponent implements OnInit {
  // @Input() shows: Show[];
  shows;
  displayIdx: number;

  constructor() {}

  ngOnInit(): void {
    this.shows = fakeShows;
  }

  showDetails(i: number): void {
    this.displayIdx = i;
  }

  getImgStyle(i: number) {
    if (i == this.displayIdx) return { filter: 'blur(3px)'};
    else return {};
  }
}
