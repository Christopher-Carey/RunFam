import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'


@Component({
  selector: 'app-leader',
  templateUrl: './leader.component.html',
  styleUrls: ['./leader.component.css']
})
export class LeaderComponent implements OnInit {

  constructor(
    private _apiService: ApiService,
  ) { }

//======Variables======
allUsers;
//=====================


  ngOnInit() {
    this.getApisFromService()
  }

   getApisFromService(){
    let observable = this._apiService.getApis();
    observable.subscribe(results => {
      // console.log("yay",results)
      this.allUsers = results['results']
    })
  }

}
