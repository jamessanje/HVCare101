import { Component,  Injectable, ViewChild } from '@angular/core';
import { NavController} from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Chart } from 'chart.js';

Chart.defaults.global.defaultFontColor = 'black'

@Component({
  selector: 'page-monitor',
  templateUrl: 'monitor.html'
})

@Injectable()
export class MonitorPage {
  
  result = []
  dates = []
  timeStamp = []
  valueTemp = []
  valueHum = []
  valuePh = []
  Temperatures = []
  humidity = ""
  temperature = ""
  acidity = ""
  sensor_humidity = ""
  sensor_temperature = ""
  sensor_acidity = ""
  cropName1 = ""
  cropName2 = ""
  cropName3 = ""

  Cooler_Status = ""
  phDown_Status = ""
  phUp_Status = ""

  temp_Statusbtn = true;
  phUp_Statusbtn = true;
  phDown_Statusbtn = true;
  

  highest_acidity = ""
  lowest_acidity = ""
  highest_humidity = ""
  lowest_humidity = ""
  highest_temperature = ""
  lowest_temperature = ""


  

  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('lineCanvas2') lineCanvas2;
  @ViewChild('lineCanvas3') lineCanvas3;
  
  lineChart: any;
  lineChart2: any;
  lineChart3: any;

  arrData: any;
  arrName: any;
  arrStatus: any;

 
  constructor(public navCtrl: NavController, public firebaseDb: AngularFireDatabase){
    this.Toggle = true;
    this.TogglePhUp = true;
    this.TogglePhDown = false;

    this.firebaseDb.list('/Sensor_Data').valueChanges().subscribe(snapshots=>{
    this.arrData = snapshots;
  
    // this.sensor_humidity = this.arrData[0];
    // this.sensor_acidity = this.arrData[1];
    // this.sensor_temperature = this.arrData[2];
    // this.humidity = this.arrData[3];
    // this.acidity = this.arrData[4];
    // this.temperature = this.arrData[5];
    this.sensor_humidity = this.arrData[0];
    this.sensor_acidity = this.arrData[1];
    this.sensor_temperature = this.arrData[2];
    this.humidity = this.arrData[3];
    this.highest_humidity = this.arrData[4];
    this.lowest_humidity = this.arrData[5];
    this.acidity = this.arrData[6];
    this.highest_acidity = this.arrData[7];
    this.lowest_acidity = this.arrData[8];
    this.temperature = this.arrData[9];
    this.highest_temperature = this.arrData[10];
    this.lowest_temperature = this.arrData[11];
    });
    
    this.firebaseDb.list('/Crop_Data/Crop_Name').valueChanges().subscribe(snapshots=>{
      this.arrName = snapshots;
      this.cropName1 = this.arrName[0];
      this.cropName2 = this.arrName[1];
      this.cropName3 = this.arrName[2];

  
    });





    this,firebaseDb.list('/Actuator_Status/Monitor').valueChanges().subscribe(snapshots=>{
      this.arrStatus = snapshots;
      this.Cooler_Status = this.arrStatus[0];
      this.phDown_Status = this.arrStatus[1];
      this.phUp_Status = this.arrStatus[2];
      
      if(this.Cooler_Status == "1"){
        this.temp_Statusbtn = true;
      }
      else{
        this.temp_Statusbtn = null;
      }
      if(this.phDown_Status == "1"){
        this.phDown_Statusbtn = true;
      }
      else{
        this.phDown_Statusbtn = null;
      }
      if(this.phUp_Status == "1"){
        this.phUp_Statusbtn = true;
      }
      else{
        this.phUp_Statusbtn = null;
      }
    });
    

    
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
    
    /*this.firebaseDb.list('Realtime_Data', ref => ref.limitToLast(12)).snapshotChanges().map(actions =>{
      this.timeStamp = [];
      return actions.map(action => ({ key: action.key, ...action.payload.val()}));
    }).subscribe(dates => {
      dates.map(date => {
        this.timeStamp.push(date.key);
      });
    });*/

    /*this.firebaseDb.list('Realtime_Data', ref => ref.limitToLast(12)).valueChanges().subscribe(snapshots=>{
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


    

    /*this.firebaseDb.list("/Crop_Data/Crop_Name", { preserveSnapshot: true})
    .subscribe(snapshots=>{
      snapshots.forEach(snapshot => {
        if(snapshot.key=="Optimal_Humidity"){
          this.humidity = snapshot.val();
        }
      });
    });*/
    //console.log(this.timeStamp);
    //console.log(this.result);
    console.log(this.valueTemp);
    console.log(this.valueHum);
    console.log(this.valuePh);
  }
  

  updateValues(){
    this.lineChart.update();
  }


  ionViewDidLoad() {
    var temp = this;
    setInterval(function(){
      temp.lineChart = new Chart(temp.lineCanvas.nativeElement, {
        type: 'line',
        data: {
          //labels: ['Jan','Feb','Mar','Aprl','May'],
          labels: temp.timeStamp,
          datasets: [{
            label: "Temperature",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(255,255,255,0.2)",
            borderColor: "rgb(0,0,0)",
            borderCapStyle: 'round',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'round',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "rgb(0,0,0)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10,
            data: temp.valueTemp,
            //data: ['5','10','15','20','25'],  
            spanGaps: false,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: false,
                max: 30,
                min: 0
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


      temp.lineChart2 = new Chart(temp.lineCanvas2.nativeElement, {
        type: 'line',
        data: {
          labels: temp.timeStamp,
          //labels: ['Jan','Feb','Mar','Aprl','May'],
          datasets: [{
            label: "Humidity",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(255,255,255,0.2)",
            //borderColor: "rgba(75,192,192,1)",
            borderColor: "rgb(0,0,0)",
            borderCapStyle: 'round',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'round',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "rgb(0,0,0)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10,
            data: temp.valueHum,
            //data: ['55','60','65','70','75'],
            spanGaps: false,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: false,
                max: 100,
                min: 50
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



      temp.lineChart3 = new Chart(temp.lineCanvas3.nativeElement, {
        type: 'line',
        data: {
          labels: temp.timeStamp,
          //labels: ['Jan','Feb','Mar','Aprl','May'],
          datasets: [{
            label: "Acidity",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(255,255,255,0.2)",
            borderColor: "rgb(0,0,0)",
            borderCapStyle: 'round',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'round',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "rgb(0,0,0)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10,
            data: temp.valuePh,
            //data: ['2','4','6','8','10'],
            spanGaps: false,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: false,
                max: 15,
                min: 0
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
    
      temp.lineChart.update();
      temp.lineChart2.update();
      temp.lineChart3.update();
    }, 5000);
    
  }
  

}



