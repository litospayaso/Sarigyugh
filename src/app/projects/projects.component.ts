import { Component, OnInit } from '@angular/core';

declare var require: any;
const projectsJson = require('../../assets/projects.json');

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public projects = projectsJson;

  constructor() { }

  ngOnInit() {
  }

  calculateWidth(index: number): string {
    const offset = 225;
    if (window.innerWidth < 450) {
      return '100%';
    } else {
      let widthArray = [2 / 3, 1 / 3, 1 / 2];
      widthArray = widthArray.concat(widthArray.slice().reverse()).concat([1 / 2, 1 / 2]);
      console.log(widthArray);
      if (index === 0) {
        return '99%';
      }
      if (index === this.projects.length - 1) {
        if (projectsJson.length % 2) {
          return ((window.innerWidth - offset) * widthArray[(index - 1) % widthArray.length]).toFixed(2).concat('px');
        } else {
          return '99%';
        }
      }
      return ((window.innerWidth - offset) * widthArray[(index - 1) % widthArray.length]).toFixed(2).concat('px');
    }
  }

}
