import { Component, Injectable, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertController } from 'ionic-angular';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

@Injectable()
export class HomePage {
  dates = []
  result = []
  timeStamp = []
  valueTemp = []
  valueHum = []
  valuePh = []
  Temperatures = []
  crop1 = ""
  crop2 = ""
  crop3 = ""
  buttonDisabled = true;
  
  

  @ViewChild('lineCanvasHome') lineCanvasHome;
  lineChartHome: any;

  constructor(public navCtrl: NavController, public firebaseDb: AngularFireDatabase, public alertCtrl: AlertController,
    public authProvider: AuthProvider) {
    this.crop1 = "";
    this.crop2 = "";
    this.crop3 = "";

    /*this.afd.list('Realtime_Data', ref => ref.limitToLast(12)).snapshotChanges().map(actions =>{
      this.timeStamp = [];
      return actions.map(action => ({ key: action.key, ...action.payload.val()}));
    }).subscribe(dates => {
      dates.map(date => {
        this.timeStamp.push(date.key);
      });
    });

    this.afd.list('Realtime_Data', ref => ref.limitToLast(12)).valueChanges().subscribe(snapshots=>{
      this.valueTemp = [];
      this.valueHum = [];
      this.valuePh = [];
      this.result = snapshots;
      this.result.map(key => {
        this.valueTemp.push(key.Measured_Temp_C);
        this.valueHum.push(key.Measured_Humidity);
        this.valuePh.push(key.Measured_PHLevel);
      });
    });*/

    var datem = "";
    var year = "";
    var month = "";
    var day = "";
    this.firebaseDb.list('Realtime_Data', ref => ref.limitToLast(1)).snapshotChanges().map(actions =>{
      return actions.map(action => ({ key: action.key, ...action.payload.val()}));
    }).subscribe(dates => {
      dates.map(date => {
        year = date.key;
        console.log(year);
        this.firebaseDb.list('Realtime_Data/'+year, ref => ref.limitToLast(1)).snapshotChanges().map(actions =>{
          return actions.map(action => ({ key: action.key, ...action.payload.val()}));
        }).subscribe(dates => {
          dates.map(date => {
            month = date.key;
            console.log(month);
            this.firebaseDb.list('Realtime_Data/'+year+'/'+month, ref => ref.limitToLast(1)).snapshotChanges().map(actions =>{
              return actions.map(action => ({ key: action.key, ...action.payload.val()}));
            }).subscribe(dates => {
              dates.map(date => {
                day = date.key;
                console.log(day);
                this.firebaseDb.list('Realtime_Data/'+year+'/'+month+'/'+day, ref => ref.limitToLast(1)).snapshotChanges().map(actions =>{
                  return actions.map(action => ({ key: action.key, ...action.payload.val()}));
                }).subscribe(dates => {
                  dates.map(date => {
                    datem = date.key;
                    console.log(datem);

                    
                    this.firebaseDb.list('Realtime_Data/'+year+'/'+month+'/'+day+'/'+datem, ref => ref.limitToLast(1)).valueChanges().subscribe(snapshots=>{
                      this.dates = [];
                      this.result = snapshots;
                      this.result.map(key => {
                        this.dates.push(key.Date_Complete);
                      });
                    });
                    this.firebaseDb.list('Realtime_Data/'+year+'/'+month+'/'+day+'/'+datem, ref => ref.limitToLast(5)).valueChanges().subscribe(snapshots=>{
                      this.valueTemp = [];
                      this.timeStamp = [];
                      this.result = snapshots;
                      this.result.map(key => {
                        this.valueTemp.push(key.Measured_Temp_C);
                        this.timeStamp.push(key.Time);
                      });
                    });
                    this.firebaseDb.list('Realtime_Data/'+year+'/'+month+'/'+day+'/'+datem, ref => ref.limitToLast(5)).valueChanges().subscribe(snapshots=>{
                      this.valueHum = [];
                      this.timeStamp = [];
                      this.result = snapshots;
                      this.result.map(key => {
                        this.valueHum.push(key.Measured_Humidity);
                        this.timeStamp.push(key.Time);
                      });
                    });
                    this.firebaseDb.list('Realtime_Data/'+year+'/'+month+'/'+day+'/'+datem, ref => ref.limitToLast(5)).valueChanges().subscribe(snapshots=>{
                      this.valuePh = [];
                      this.timeStamp = [];
                      this.result = snapshots;
                      this.result.map(key => {
                        this.valuePh.push(key.Measured_PHLevel);
                        this.timeStamp.push(key.Time);
                      });
                    });

                  }); 
                });
              });
            });
          });
        });
      });
    });

    console.log(this.valueTemp);
    console.log(this.valueHum);
    console.log(this.valuePh);

  }

  doConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Are you sure you want to select these crops?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            //console.log('Agree clicked');
            this.update();
            this.Confirmed();
          }
        }
      ]
    });
    confirm.present()
  }

  Confirmed() {
    let confirmed = this.alertCtrl.create({
      title: '',
      message: 'The crops have been selected!',
      buttons: [
        {
          text: 'Done',
          handler: () => {
            console.log('Done clicked');
            
          }
        }
      ]
    });
    confirmed.present()
  }

  /*check(){
    if(this.crop1 != '' || this.crop2 != '' || this.crop3 != ''){
      this.buttonDisabled=false;
    }else{
      this.buttonDisabled=true;
    }
  }*/

  
  

  change(value){
    console.log(this.crop1);
    this.crop1 = value.toString();
    if(this.crop1 != "" || this.crop2 !=  "" || this.crop3 != ""){
      this.buttonDisabled = null;
    }
  }
  change2(value){
    console.log(this.crop2);
    this.crop2 = value.toString();
    if(this.crop1 != "" || this.crop2 != "" || this.crop3 != ""){
      this.buttonDisabled = null;
    }
  }
  change3(value){
    console.log(this.crop3);
    this.crop3 = value.toString();
    if(this.crop1 != "" || this.crop2 != "" || this.crop3 != ""){
      this.buttonDisabled = null;
    }
  }
  
  update(){
    console.log(this.crop1);
    this.firebaseDb.list("/Crop_Data/Crop_Name/").remove();
    this.firebaseDb.list("/Crop_Data/Crop_Name/").push(this.crop1.toString());
    this.firebaseDb.list("/Crop_Data/Crop_Name/").push(this.crop2.toString());
    this.firebaseDb.list("/Crop_Data/Crop_Name/").push(this.crop3.toString());
  }

  ionViewDidLoad() {
    var temp = this;
    setInterval(function(){
      temp.lineChartHome = new Chart(temp.lineCanvasHome.nativeElement, {
        type: 'line',
        data: {
        labels: temp.timeStamp,
        //labels: ['Jan','Feb','Mar','Aprl','May'],
          datasets: [{
            label: "Temperature",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(219,112,147,0.4)",
            borderColor: "rgb(219,112,147)",
            borderCapStyle: 'square',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "rgb(219,112,147)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10,
            data: temp.valueTemp,
            //data: ['5','10','15','20','25'],  
            spanGaps: true,
          }, 
          {
            label: "Humidity",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(147,112,219,0.4)",
            //borderColor: "#DC143C", // The main line color
            borderColor: "rgb(147,112,219)",
            borderCapStyle: 'square',
            borderDash: [], // try [5, 15] for instance
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "rgb(147,112,219)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10,
            data: temp.valueHum,
            //data: ['55','60','65','70','75'],
            spanGaps: true,
          },
          {
            label: "Acidity",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(46,139,87,0.4)",
            //borderColor: "rgb(167, 105, 0)",
            borderColor: "rgb(46,139,87)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "rgb(46,139,87)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10,
            data: temp.valuePh,
            //data: ['2','4','6','8','10'],
            spanGaps: false,
          }

        ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                  beginAtZero:true
              },
              scaleLabel: {
                  display: true,
                  labelString: temp.dates,
                  fontSize: 20 
              }
            }]
          }
          
        }
      
      });


    }, 5000);

    
  
  }

  async logOut(): Promise<void> {
    this.ConfirmLogOut();
    //await this.authProvider.logoutUser();
    //this.navCtrl.setRoot('LoginPage');
  }

  ConfirmLogOut(){
    let confirm = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            //console.log('Agree clicked');
            this.ConfirmedLogOut;
            this.authProvider.logoutUser();
            this.navCtrl.setRoot('LoginPage');
          }
        }
      ]
    });
    confirm.present()

  }

  ConfirmedLogOut(){
    let confirmed = this.alertCtrl.create({
      title: '',
      message: 'You have logged out!',
      buttons: [
        {
          text: 'Done',
          handler: () => {
            console.log('Done clicked');
            
          }
        }
      ]
    });
    confirmed.present()
  }

}
