import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    document.getElementById('sidenavPanel').style.width = '0px';
    this.route.params.subscribe(params => {
        console.log(params.elementId);
        if (params.elementId) {
          document.getElementById(params.elementId).scrollIntoView();
        }
    });
  }

}
