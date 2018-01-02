import { Component,  Injectable, ViewChild } from '@angular/core';
import { NavController} from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Chart } from 'chart.js';


@Component({
  selector: 'page-monitor',
  templateUrl: 'monitor.html'
})

@Injectable()
export class MonitorPage {
  arrData = []
  result = []
  timeStamp = []
  valueHumidity = []
  value = ["Timestamp1", "Timestamp2", "Timestamp3", "Timestamp4", "Timestamp5", "Timestamp6", "Timestamp7"]
  humidity = ""
  temperature = ""
  acidity = ""
  sensor_humidity = ""
  sensor_temperature = ""
  sensor_acidity = ""
  cropName1 = ""
  cropName2 = ""
  cropName3 = ""
  

  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('lineCanvas2') lineCanvas2;
  @ViewChild('lineCanvas3') lineCanvas3;
  
  lineChart: any;
  lineChart2: any;
  lineChart3: any;
 
  constructor(public navCtrl: NavController, public firebaseDb: AngularFireDatabase){
    
    this.firebaseDb.list('/Sensor_Data').valueChanges().subscribe(snapshots=>{
    this.arrData = snapshots;
  
    this.sensor_humidity = this.arrData[0];
    this.sensor_acidity = this.arrData[1];
    this.sensor_temperature = this.arrData[2];
    this.humidity = this.arrData[3];
    this.acidity = this.arrData[4];
    this.temperature = this.arrData[5];
    });
    
    this.firebaseDb.list('/Crop_Data/Crop_Name').valueChanges().subscribe(snapshots=>{
      this.arrData = snapshots;
      this.cropName1 = this.arrData[0];
      this.cropName2 = this.arrData[1];
      this.cropName3 = this.arrData[2];

  
    });

    this.firebaseDb.list('Realtime_Data').snapshotChanges().map(actions =>{
      return actions.map(action => ({ key: action.key, ...action.payload.val()}));
    }).subscribe(dates => {
      this.timeStamp = dates.map(date => date.key);
      
    });

    this.firebaseDb.list('Realtime_Data').valueChanges().subscribe(snapshots=>{
      this.valueHumidity = snapshots;
      this.result = this.valueHumidity.map(key => key.Measured_Humidity);
    });

    

    /*this.firebaseDb.list("/Crop_Data/Crop_Name", { preserveSnapshot: true})
    .subscribe(snapshots=>{
      snapshots.forEach(snapshot => {
        if(snapshot.key=="Optimal_Humidity"){
          this.humidity = snapshot.val();
        }
      });
    });*/
    console.log(this.timeStamp);
    console.log(this.result);
    console.log(this.arrData);
  }


  ionViewDidLoad() {
    /*this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFFF00",
            "#008000",
            "#800080",
            "#FFCE56" 
            ],
            hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFFF00",
            "#008000",
            "#800080",
            "#FFCE56"
            ],
                        
       
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutoutPercentage: 30,
        }
                 
      
    });*/
      this.lineChart = new Chart(this.lineCanvas.nativeElement, {
        type: 'line',
        data: {
          //labels: this.timeStamp.toString(),
          labels: this.value,
          datasets: [{
            label: "Temperature Graph <3",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'round',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'round',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.result,
            spanGaps: false,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
                //type: 'category',
                labels: this.result,
            }]
          }
          
        }
      
      });


      this.lineChart2 = new Chart(this.lineCanvas2.nativeElement, {
        type: 'line',
        data: {
          labels: ["Timestamp1", "Timestamp2", "Timestamp3", "Timestamp4", "Timestamp5", "Timestamp6", "Timestamp7"],
          datasets: [{
            label: "Humidity Graph <3",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'round',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'round',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [50, 57, 63, 70, 80, 68, 60],
            spanGaps: false,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
                //type: 'category',
                labels: ['80', '75', '70', '65', '60', '55', '50'],
            }]
          }
          
        }
      
      });



      this.lineChart3 = new Chart(this.lineCanvas3.nativeElement, {
        type: 'line',
        data: {
          labels: ["Timestamp1", "Timestamp2", "Timestamp3", "Timestamp4", "Timestamp5", "Timestamp6", "Timestamp7"],
          datasets: [{
            label: "pH Graph <3",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'round',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'round',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [3, 6, 4, 5, 9, 7, 8],
            spanGaps: false,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
                //type: 'category',
                labels: ['9', '8', '7', '6', '5', '4', '3'],
            }]
          }
          
        }
      
      });
    

  }
  

}


