import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';
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
    ) { }
//======Variables======
  user;
  loginForm : FormGroup;
  errors={
    email:"",
    password:""
  }
//=====================


  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
    // localStorage.clear()
    var localStorageEmail = localStorage.getItem("Email")
    if(localStorageEmail != null){
      let observable = this._apiService.getApi(localStorageEmail);
      observable.subscribe(results => {
        // console.log("yay",results)
        this.user = results['results']
        this.appComp.user = results['results']
        this.appComp.loggedIn = true
        this.appComp.userDash = true
      
      })
    }
  }


  //======Methods========
  ApiFromService(id){
    var password = this.loginForm.controls.password.value
    let observable = this._apiService.getApi(id);
    observable.subscribe(results => {
      // console.log("yay",results)
      this.user = results['results']
      this.appComp.user = results['results']
      if(this.user == null){
        this.errors.email = "No such User..Need to Register?"
      }else{
        this.appComp.loggedIn = bcrypt.compareSync(password, this.user.password);
        if (this.appComp.loggedIn == true){
          this.appComp.userDash = true
          var CheckDom = document.getElementById("keep") as HTMLInputElement
          CheckDom.checked
          if(CheckDom.checked == true){
            localStorage.setItem("Email",this.user.email)
          }
        }
        if(this.appComp.loggedIn == false){
          this.errors.password= "Wrong Password"
        }
      }
    })
  }
  showReg(){
    this.appComp.showReg = true
    this.appComp.showLogin = false
  }
  //=====================

}
