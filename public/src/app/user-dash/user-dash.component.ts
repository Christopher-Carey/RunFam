import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'
import { ApiService } from '../api.service'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';
import { LeaderComponent } from '../leader/leader.component';
import { createWorker } from 'tesseract.js';


import { NgxImageCompressService } from 'ngx-image-compress';


@Component({
  selector: 'app-user-dash',
  templateUrl: './user-dash.component.html',
  styleUrls: ['./user-dash.component.css']
})
export class UserDashComponent implements OnInit {

  //======Variables======
  Chart = Chart;
  user;
  totalDist: any;
  distLeft;
  milesForm: FormGroup
  arr;
  TextOutput: any;
  spinner: boolean;
  TextArry: any;
  File;
  showleader = false
  Quote = ""

  imgResultBeforeCompress
  imgResultAfterCompress
  //====================


  constructor(
    private _apiService: ApiService,
    private formBuilder: FormBuilder,
    private appComp: AppComponent,
    private leadComp: LeaderComponent,
    private imageCompress: NgxImageCompressService
  ) { }

  ngOnInit() {
    this.totalDist = 0
    this.milesForm = new FormGroup({
      date: new FormControl(),
      miles: new FormControl(),
      goal: new FormControl()
    });
    // this.milesForm.controls.goal.setValue(0)
    this.user = this.appComp.user
    this.milesForm.controls.goal.setValue(this.user.goal)
    var dist = 0
    for (let i = 0; i < this.user.distance.length; i++) {
      dist += this.user.distance[i][1]

    }
    this.totalDist = dist.toFixed(2)
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
          display: true,
        },

      }
    });
    this.quote()

  }

  //======Methods========
  addMiles() {
    this.totalDist = 0
    this.user.distance.unshift([this.milesForm.controls.date.value, this.milesForm.controls.miles.value, this.imgResultAfterCompress])
    var dist = 0
    for (let i = 0; i < this.user.distance.length; i++) {
      dist += this.user.distance[i][1]
    }
    this.totalDist = dist.toFixed(2)
    this.user.totalDist = this.totalDist

    let observable = this._apiService.updateApi(this.user);
    observable.subscribe(results => {
      
      this.Chart.data.datasets[0].data = [this.distLeft, this.totalDist]
      this.Chart.update();
      document.getElementById("blah").click()
      // this.leadComp.ngOnInit()
      
      this.File = ""
      this.imgResultAfterCompress = ""
      this.milesForm.controls.date.setValue(" ")
      this.milesForm.controls.miles.setValue(" ")
    })
  }
  Upload(event) {
    this.File = event.target.files[0]
    this.getBase64(this.File).then(
      data => {
        this.imgResultBeforeCompress = data
        // console.log(this.imgResultBeforeCompress)
        // console.warn('Size in bytes was:', this.imageCompress.byteCount(this.base));
        this.imageCompress.compressFile(this.imgResultBeforeCompress,50, 50).then(
          result => {
            this.imgResultAfterCompress = result;
            // this.imgResultAfterCompress = result;
            // this.File = this.imgResultAfterCompress
            // this.base = this.imgResultAfterCompress
            // console.log(this.base)
            // console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
          }
        );
      }
    );
  }
  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  // compressFile() {
  //   this.imageCompress.uploadFile().then(({ image, orientation }) => {
  //     console.log(orientation)

  //     this.imgResultBeforeCompress = image;
  //     console.log(this.imgResultBeforeCompress)

  //     console.warn('Size in bytes was:', this.imageCompress.byteCount(image));

  //     this.imageCompress.compressFile(image, orientation, 50, 50).then(
  //       result => {
  //         this.imgResultAfterCompress = result;
  //         this.File = this.imgResultAfterCompress
  //         this.base = this.imgResultAfterCompress
  //         console.log(this.imgResultAfterCompress)
  //         console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
  //       }
  //     );

  //   });
  // }

  ReadImg() {
    this.spinner = true
    const worker = createWorker({
      // logger: m => console.log(m)
    });
    (async () => {
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize(this.File);

      // ================ This is a mess
      this.TextOutput = text
      this.TextArry = text.split(" ")
      // console.log(this.TextArry)
      // console.log(this.TextArry.indexOf("HEART") + 2)

      var ttt = this.TextArry[this.TextArry.indexOf("HEART") + 2]
      var tttt = ttt.slice(3)
      var cccc = parseFloat(tttt)
      this.milesForm.controls.miles.setValue(cccc)
      // console.log(ttt.slice(3))
      // console.log(this.TextArry[this.TextArry.indexOf("HEART") + 2])

      // console.log(text);
      // =============================

      await worker.terminate();
      this.spinner = false

    })();
  }

  deleteEntry(entry) {
    var index = this.user.distance.indexOf(entry)
    this.user.distance.splice(index, 1)
    var dist = 0
    for (let i = 0; i < this.user.distance.length; i++) {
      dist += this.user.distance[i][1]

    }
    this.totalDist = dist.toFixed(2)
    this.user.totalDist = this.totalDist
    let observable = this._apiService.updateApi(this.user);
    observable.subscribe(results => {
      this.Chart.data.datasets[0].data = [this.distLeft, this.totalDist]
      this.Chart.update();
    })
  }

  show(id) {
    var dialog = <HTMLDivElement>document.getElementById(id);
    dialog.className = "modal show"
    dialog.style.display = "block"
    // console.log(dialog)
  }
  close(id) {
    var dialog = <HTMLDivElement>document.getElementById(id);
    dialog.className = "modal"
    dialog.style.display = "none"
    // console.log(dialog)
  }
  showLeader() {
    this.showleader = true
  }
  showlead() {

    this.appComp.showLeader = true
    this.appComp.userDash = false

  }
  updateGoal() {
    this.user.goal = this.milesForm.controls.goal.value
    this.distLeft = this.user.goal - this.totalDist

    let observable = this._apiService.updateApi(this.user);
    observable.subscribe(results => {
      this.Chart.data.datasets[0].data = [this.distLeft, this.totalDist]
      this.Chart.update();
    })

  }
  logout() {
    localStorage.clear()
  }

  quote() {
    var quoteList = {
      1: "If you want to achieve greatness stop asking for permission. --Anonymous",

      2: "Things work out best for those who make the best of how things work out. --John Wooden",

      3: "To live a creative life, we must lose our fear of being wrong. --Anonymous",

      4: "If you are not willing to risk the usual you will have to settle for the ordinary. --Jim Rohn",

      5: "Trust because you are willing to accept the risk, not because it's safe or certain. --Anonymous",

      6: "Take up one idea. Make that one idea your life--think of it, dream of it, live on that idea. Let the brain, muscles, nerves, every part of your body, be full of that idea, and just leave every other idea alone. This is the way to success. --Swami Vivekananda",

      7: "All our dreams can come true if we have the courage to pursue them. --Walt Disney",

      8: "Good things come to people who wait, but better things come to those who go out and get them. --Anonymous",

      9: "If you do what you always did, you will get what you always got. --Anonymous",

      10: "Success is walking from failure to failure with no loss of enthusiasm. --Winston Churchill",

      11: "Just when the caterpillar thought the world was ending, he turned into a butterfly. --Proverb",

      12: "Successful entrepreneurs are givers and not takers of positive energy. --Anonymous",

      13: "Whenever you see a successful person you only see the public glories, never the private sacrifices to reach them. --Vaibhav Shah",

      14: "Opportunities don't happen, you create them. --Chris Grosser",

      15: "Try not to become a person of success, but rather try to become a person of value. --Albert Einstein",

      16: "Great minds discuss ideas; average minds discuss events; small minds discuss people. --Eleanor Roosevelt",

      17: "I have not failed. I've just found 10,000 ways that won't work. --Thomas A. Edison",

      18: "If you don't value your time, neither will others. Stop giving away your time and talents--start charging for it. --Kim Garst",

      19: "A successful man is one who can lay a firm foundation with the bricks others have thrown at him. --David Brinkley",

      20: "No one can make you feel inferior without your consent. --Eleanor Roosevelt",

      21: "The whole secret of a successful life is to find out what is one's destiny to do, and then do it. --Henry Ford",

      22: "If you're going through hell keep going. --Winston Churchill",

      23: "The ones who are crazy enough to think they can change the world, are the ones who do. --Anonymous",

      24: "Don't raise your voice, improve your argument. --Anonymous",

      25: "What seems to us as bitter trials are often blessings in disguise. --Oscar Wilde",

      26: "The meaning of life is to find your gift. The purpose of life is to give it away. --Anonymous",

      27: "The distance between insanity and genius is measured only by success. --Bruce Feirstein",

      28: "When you stop chasing the wrong things, you give the right things a chance to catch you. --Lolly Daskal",

      29: "I believe that the only courage anybody ever needs is the courage to follow your own dreams. --Oprah Winfrey",

      30: "No masterpiece was ever created by a lazy artist. --Anonymous",

      31: "Happiness is a butterfly, which when pursued, is always beyond your grasp, but which, if you will sit down quietly, may alight upon you. --Nathaniel Hawthorne",

      32: "If you can't explain it simply, you don't understand it well enough. --Albert Einstein",

      33: "Blessed are those who can give without remembering and take without forgetting. --Anonymous",

      34: "Do one thing every day that scares you. --Anonymous",

      35: "What's the point of being alive if you don't at least try to do something remarkable. --Anonymous",

      36: "Life is not about finding yourself. Life is about creating yourself. --Lolly Daskal",

      37: "Nothing in the world is more common than unsuccessful people with talent. --Anonymous",

      38: "Knowledge is being aware of what you can do. Wisdom is knowing when not to do it. --Anonymous",

      39: "Your problem isn't the problem. Your reaction is the problem. --Anonymous",

      40: "You can do anything, but not everything. --Anonymous",

      41: "Innovation distinguishes between a leader and a follower. --Steve Jobs",

      42: "There are two types of people who will tell you that you cannot make a difference in this world: those who are afraid to try and those who are afraid you will succeed. --Ray Goforth",
    }
    var ranNum = Math.floor(Math.random() * 42)
    // console.log(ranNum)
    this.Quote = quoteList[ranNum]
  }

  //====================

}
