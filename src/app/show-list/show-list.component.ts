import { Component, OnInit, Input } from '@angular/core';
import { Show } from '../video-player/show.model';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css'],
})
export class ShowListComponent implements OnInit {
  @Input() shows: Show[];

  constructor() {}

  ngOnInit(): void {
  }
}
