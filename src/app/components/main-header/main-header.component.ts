import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  faBars = faBars;
  showSideNav: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  toggleSideNav(): void {
    this.showSideNav = !this.showSideNav;
    if (this.showSideNav) {
      document.getElementById('sideNav').style.height = '200px';
      document.getElementById('sideNav').style.borderTop = '1px solid white';
    } else if (!this.showSideNav) {
      document.getElementById('sideNav').style.height = '0';
      document.getElementById('sideNav').style.borderTop = 'none';
    }
  }
}
