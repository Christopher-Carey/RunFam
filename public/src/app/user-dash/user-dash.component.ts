import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'

@Component({
  selector: 'app-user-dash',
  templateUrl: './user-dash.component.html',
  styleUrls: ['./user-dash.component.css']
})
export class UserDashComponent implements OnInit {
  Chart = [];


  constructor() { }

  ngOnInit() {
    this.Chart = new Chart('chart', {
      type: 'doughnut',
      data: {
          labels: ["Goal","Accomplishment"],
          datasets: [{
              label: '',
              data: [100,20],
              backgroundColor: [
                'rgb(221,82,43, 0.2)',
                'rgb(36,98,36, 0.2)',
            ]
          }]
      },
      options: {
          title: {
              text: "",
              display: true
          },
     
      }
  });
  }

}
