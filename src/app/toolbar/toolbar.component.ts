import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openSidenav() {
    document.getElementById('sidenavPanel').style.width = '150px';
  }

  closeSidenav() {
    document.getElementById('sidenavPanel').style.width = '0px';
  }
}
