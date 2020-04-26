import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  searchBarIsFocused: boolean;
  constructor() {}

  ngOnInit(): void {
    this.searchBarIsFocused = false;
  }

  onToggleSidenav(): void {}

  searchBarOnFocus(): void {
    this.searchBarIsFocused = true;
  }

  searchBarOnBlur(): void {
    this.searchBarIsFocused = false;
  }
}
