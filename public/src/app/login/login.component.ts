import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as bcrypt from 'bcryptjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private _apiService: ApiService,
    private formBuilder : FormBuilder
    ) { }

  user;
  login;
  loginForm : FormGroup;


  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  ApiFromService(id){
    var password = this.loginForm.controls.password.value
    console.log(this.user)

    let observable = this._apiService.getApi(id);
    observable.subscribe(results => {
      console.log("yay",results)
      this.user = results
      console.log(this.user.results)
      if(this.user != undefined){
        this.login = bcrypt.compareSync(password, this.user.results.password); // true
        console.log(this.login)
      }
    })
  }

}
