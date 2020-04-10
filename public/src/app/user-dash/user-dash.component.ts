import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'
import { ApiService } from '../api.service'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';
import { createWorker } from 'tesseract.js';


@Component({
  selector: 'app-user-dash',
  templateUrl: './user-dash.component.html',
  styleUrls: ['./user-dash.component.css']
})
export class UserDashComponent implements OnInit {

  //======Variables======
  Chart = [];
  user;
  totalDist = 0
  distLeft;
  milesForm: FormGroup
  arr;
  TextOutput: any;
  spinner: boolean;
  TextArry: any;
  File;
  base;
  //====================


  constructor(
    private _apiService: ApiService,
    private formBuilder: FormBuilder,
    private appComp: AppComponent,
  ) { }

  ngOnInit() {
    this.totalDist = 0
    this.milesForm = new FormGroup({
      date: new FormControl(),
      miles: new FormControl(),
    });

    this.user = this.appComp.user

    for (let i = 0; i < this.user.distance.length; i++) {
      this.totalDist += this.user.distance[i][1]
    }
    this.distLeft = this.user.goal - this.totalDist

    this.Chart = new Chart('chart', {
      type: 'doughnut',
      data: {
        labels: ["Distance Left", "Accomplished"],
        datasets: [{
          label: '',
          data: [this.distLeft, this.totalDist],
          backgroundColor: [
            'rgb(221,82,43, 0.2)',
            'rgb(36,98,36, 0.2)',
          ]
        }]
      },
      options: {
        title: {
          text: "",
          display: true
        },

      }
    });

  }

  //======Methods========
  addMiles() {
    this.totalDist = 0
    this.user.distance.push([this.milesForm.controls.date.value, this.milesForm.controls.miles.value, this.base])
    for (let i = 0; i < this.user.distance.length; i++) {
      this.totalDist += this.user.distance[i][1]
    }
    this.user.totalDist = this.totalDist

    let observable = this._apiService.updateApi(this.user);
    observable.subscribe(results => {
      Chart.update()
    })
  }

  Upload(event) {
    this.File = event.target.files[0]
    var file = this.File
    this.getBase64(file).then(
      data => {
        this.base = data
        console.log(data)
        console.log(this.base)
      }
    );
    console.log(this.base)
    console.log(event)
  }

  test() {
    this.spinner = true
    const worker = createWorker({
      logger: m => console.log(m)
    });

    (async () => {
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize(this.File);
      this.TextOutput = text
      this.TextArry = text.split(" ")
      console.log(this.TextArry)
      console.log(this.TextArry.indexOf("HEART") + 2)

      var ttt = this.TextArry[this.TextArry.indexOf("HEART") + 2]
      var tttt = ttt.slice(3)
      var cccc = parseFloat(tttt)
      this.milesForm.controls.miles.setValue(cccc)
      console.log(ttt.slice(3))
      console.log(this.TextArry[this.TextArry.indexOf("HEART") + 2])

      console.log(text);
      await worker.terminate();
      this.spinner = false

    })();


  }
  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  // ApiFromService(id){
  //   let observable = this._apiService.getApi(id);
  //   observable.subscribe(results => {
  //     console.log("yay",results)
  //     this.user = results['results']
  //   })
  // }


  //====================

}
