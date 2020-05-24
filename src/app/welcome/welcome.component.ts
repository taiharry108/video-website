import { Component, OnInit } from '@angular/core';
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
