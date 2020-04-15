import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-leader-dash',
  templateUrl: './leader-dash.component.html',
  styleUrls: ['./leader-dash.component.css']
})
export class LeaderDashComponent implements OnInit {

  constructor(
    private _apiService: ApiService,
    private appComp: AppComponent,

  ) {
    
   }

 //======Variables======
runner;
walkers;
// user;
//=====================


  ngOnInit() {
    // this.user = this.appComp.user
    console.log("dsdsdsds "+this.user)
    this.getApisWalker()
    this.getApisRunner()
  }
  // =========== Methods ==========
   getApisWalker(){
    let observable = this._apiService.getApisWalk();
    observable.subscribe(results => {
      console.log("yay",results)
      this.walkers = results['results']
    })
  }
   getApisRunner(){
    let observable = this._apiService.getApisRun();
    observable.subscribe(results => {
      console.log("yay",results)
      this.runner = results['results']
      console.log(this.runner)

    })
  }
  showdash(){
    this.appComp.showLeader = false
    this.appComp.userDash = true
  }
  // ===================================
}
