import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';
import * as bcrypt from 'bcryptjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private _apiService: ApiService,
    private formBuilder : FormBuilder,
    private appComp : AppComponent,
  ) { }
//======Variables======
  regForm : FormGroup;
  user;
  hashed
  errors={
    name:"", 
    email: "",
    password: "",
    con_password: "",
    gender: "",
    goal:"",
    runnerType:""

  }
//=====================

  ngOnInit() {
    this.regForm = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      con_password: new FormControl(),
      gender: new FormControl(),
      goal:new FormControl(),
      runnerType:new FormControl()
    });
  }
  //======Methods========
  RegUser(){   
    // console.log(this.errors.password)
    for(let x in this.regForm.controls){
      if(this.regForm.controls[x].value == null){
        this.errors[x] = "Please enter Field"
      }
    }
    if(this.regForm.controls.password.value != this.regForm.controls.con_password.value){
      this.errors.password = "Passwords Don't Match"
    }else{
      var password = this.regForm.controls.password.value
      this.hashed = bcrypt.hashSync(password, 10);    
      this.createUser()
    }
  }
  createUser(){   
    this.regForm.controls.password.setValue(this.hashed)
    let observable = this._apiService.createApi(this.regForm.value);
    observable.subscribe(results => {
      this.appComp.user = results['results']
      this.appComp.loggedIn = true
      this.appComp.userDash =true
      // console.log("yay",results)
    })
    this.regForm.controls.name.setValue('')
    this.regForm.controls.password.setValue('')
    this.regForm.controls.email.setValue('')
    this.regForm.controls.password.setValue('')
    this.regForm.controls.con_password.setValue('')
    this.regForm.controls.goal.setValue('')
  }
  showLogin(){
    this.appComp.showLogin = true
    this.appComp.showReg = false
  }

//======================

}
