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
user;
//=====================


  ngOnInit() {
    this.user = this.appComp.user
    this.getApisWalker()
    this.getApisRunner()
  }
  // =========== Methods ==========
   getApisWalker(){
    let observable = this._apiService.getApisWalk();
    observable.subscribe(results => {
      // console.log("yay",results)
      this.walkers = results['results']
\    })
  }
   getApisRunner(){
    let observable = this._apiService.getApisRun();
    observable.subscribe(results => {
      // console.log("yay",results)
      this.runner = results['results']
    })
  }
  showdash(){
    this.appComp.showLeader = false
    this.appComp.userDash = true
  }
  show(id){
    var dialog= <HTMLDivElement>document.getElementById(id);
    dialog.className = "modal show"
    dialog.style.display = "block"
    // console.log(dialog)
  }
  close(id){
    var dialog= <HTMLDivElement>document.getElementById(id);
    dialog.className = "modal"
    dialog.style.display = "none"
    // console.log(dialog)
  }
  scrollDown(){
    var target = document.getElementById("walker-header")
    target.scrollIntoView()
  }
  scrollUp(){
    var target = document.getElementById("runner-header")
    target.scrollIntoView()
  }

  // ===================================
}
