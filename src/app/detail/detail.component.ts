import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var require: any;
const projectsJson = require('../../assets/projects.json');

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public project;
  constructor(
    private router: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.project = {
        name: projectsJson[params.id].name.en,
        description: projectsJson[params.id].description.en,
        pictures: projectsJson[params.id].pictures
      };
    });
  }

}
