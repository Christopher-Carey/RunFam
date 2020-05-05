import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loggedIn = false
  user;
  showLogin = true
  showReg = false
  showLeader = false
  userDash = false

  constructor(
    private _apiService: ApiService,
    ){}

  ngOnInit(){
        /** spinner starts on init */
        this.spinner.show();
 
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 5000);
      }
  
  



  // getApisFromService(){
  //   let observable = this._apiService.getApis();
  //   observable.subscribe(results => {
  //     console.log("yay",results)
  //     this.ApisList = results['results']
  //     this._apiService.getApis()
  //   })
  // }
  // ApiFromService(id){
  //   let observable = this._apiService.getApi(id);
  //   observable.subscribe(results => {
  //     console.log("yay",results)
  //     this.ApisList = results['results']
  //     this._apiService.getApi(id)
  //   })
  // }
  // createApiFromService(){
  //   let observable = this._apiService.createApi(this.newApi);
  //   observable.subscribe(results => {
  //     console.log("yay",results)
  //     this.newApi={
  //       title:'',
  //       description:''
  //     }
  //     this.getApisFromService()
  //   })
  // }
  // deleteTaskFromService(id){
  //   let observable = this._apiService.deleteApi(id);
  //   observable.subscribe(results => {
  //     console.log("yay",results)
  //     this._apiService.deleteApi(id)
  //     this.getApisFromService()
  //   })
  // }
  // updateTaskFromService(){
  //   let observable = this._apiService.updateApi(this.Api);
  //   observable.subscribe(results => {
  //     console.log("yay",results)
  //     this.Api = null;
  //     this.getApisFromService();
  //   })
  // }
}