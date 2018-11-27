import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  downloadPdf() {
    const link = document.createElement('a');
    link.setAttribute('href', 'assets/portfolio.pdf');
    link.setAttribute('download', 'Salome_Suarez_Vilas_Portfolio.pdf');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
