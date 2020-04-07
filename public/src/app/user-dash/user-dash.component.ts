import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'
import { ApiService } from '../api.service'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-user-dash',
  templateUrl: './user-dash.component.html',
  styleUrls: ['./user-dash.component.css']
})
export class UserDashComponent implements OnInit {

//======Variables======
  Chart = [];
  user;  
  totalDist = 0
  distLeft;
  milesForm : FormGroup
  arr;
//====================


  constructor(
    private _apiService: ApiService,
    private formBuilder : FormBuilder,
    private appComp : AppComponent,
  ) { }

  ngOnInit() {
    this.totalDist = 0
    this.milesForm = new FormGroup({
      date: new FormControl(),
      miles: new FormControl()
    });

    this.user = this.appComp.user
    for(let i = 0; i<this.user.distance.length;i++){
      this.totalDist += this.user.distance[i][1]
    }
    this.distLeft = this.user.goal - this.totalDist

    this.Chart = new Chart('chart', {
      type: 'doughnut',
      data: {
          labels: ["Distance Left","Accomplished"],
          datasets: [{
              label: '',
              data: [this.distLeft,this.totalDist],
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

  //======Methods========
  addMiles(){
    this.user.distance.push([this.milesForm.controls.date.value,this.milesForm.controls.miles.value])
   
    let observable = this._apiService.updateApi(this.user);
      observable.subscribe(results => {
        // console.log("yay",results)
      })
      this.ngOnInit()
    }
  //====================

}
