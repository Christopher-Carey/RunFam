import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';
// import { UserDashComponent } from '../user-dash/user-dash.component';


import * as bcrypt from 'bcryptjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(
    private _apiService: ApiService,
    private formBuilder : FormBuilder,
    private appComp : AppComponent,
    // private userDash : UserDashComponent
    ) { }

  user;
  loginForm : FormGroup;


  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  ApiFromService(id){
    var password = this.loginForm.controls.password.value
    // console.log(this.user)

    let observable = this._apiService.getApi(id);
    observable.subscribe(results => {
      console.log("yay",results)
      this.user = results['results']
      console.log(this.user)
      this.appComp.user = results['results']
      // console.log(this.user.results)
      this.appComp.loggedIn = bcrypt.compareSync(password, this.user.password); // true
      console.log(this.appComp.loggedIn)
      // console.log(this.userDash.user)
     
    })
  }

}
