import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../feature/search/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    
  }

  onToggleSidenav(): void {}

  searchBarOnEnter(searchValue: string) {
    this.searchService.searchShow(searchValue);
  }

}
