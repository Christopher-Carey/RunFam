import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'
import { AppComponent } from '../app.component';



@Component({
  selector: 'app-leader',
  templateUrl: './leader.component.html',
  styleUrls: ['./leader.component.css']
})
export class LeaderComponent implements OnInit {

  constructor(
    private _apiService: ApiService,
    private appComp: AppComponent,

  ) { }

//======Variables======
runner;
walkers;
user;
//=====================
  ngOnInit() {
    this.user = this.appComp.user
    this.getApisRunner()
    this.getApisWalker()
  }
  // =========== Methods ==========
  getApisRunner(){
    let observable = this._apiService.getApisRun();
    observable.subscribe(results => {
      // console.log("yay",results)
      this.runner = results['results']
      // console.log(this.runner)
    })
  }
   getApisWalker(){
    let observable = this._apiService.getApisWalk();
    observable.subscribe(results => {
      console.log("yay",results)
      this.walkers = results['results']
    })
  }
  // ===================================
}
