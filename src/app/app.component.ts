import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  closeSidenav() {
    document.getElementById('sidenavPanel').style.width = '0px';
  }
}
