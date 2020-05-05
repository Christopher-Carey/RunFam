import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserDashComponent } from './user-dash/user-dash.component';
import { LeaderComponent } from './leader/leader.component';
import { LeaderDashComponent } from './leader-dash/leader-dash.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserDashComponent,
    LeaderComponent,
    LeaderDashComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ApiService,LoginComponent,AppComponent,UserDashComponent,LeaderComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
