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
  runnerr;
  walkers;
  user;
  RunTop;

  //=====================
  ngOnInit() {
    this.user = this.appComp.user
    this.getApisRunner()
  }
  // =========== Methods ==========
  getApisRunner() {
    let observable = this._apiService.getApisRun();
    observable.subscribe(results => {
      console.log("yay", results)
      this.runnerr = results['results']
      // this.runnerr.sort((a, b) => (a.totalDist > b.totalDist) ? -1 : 1)
      this.getApisWalker() 

    })
  }
  getApisWalker() {
    let observable = this._apiService.getApisWalk();
    observable.subscribe(results => {
      // console.log("yay",results)
      this.walkers = results['results']
      this.walkers.sort((a, b) => (a.totalDist > b.totalDist) ? -1 : 1)
    })
  }
  scrollDown() {
    var target = document.getElementById("walker-header")
    target.scrollIntoView()
  }
  scrollUp() {
    var target = document.getElementById("runner-header")
    target.scrollIntoView()
  }
  // ===================================
}
