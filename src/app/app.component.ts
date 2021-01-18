import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'RNGmanga';

  toggleSideNav(): void {
    document.getElementById('sideNav').style.height = '0';
    document.getElementById('sideNav').style.borderTop = 'none';
  }
}
