import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ep-content',
  templateUrl: './ep-content.component.html',
  styleUrls: ['./ep-content.component.css']
})
export class EpContentComponent implements OnInit {
  lastUpdate: Date;
  constructor() { }

  ngOnInit(): void {
    this.lastUpdate = new Date();
  }

}
