import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the ControlPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-control',
  templateUrl: 'control.html',
})
@Injectable()
export class ControlPage {
  sensor_humidity = ""
  sensor_temperature = ""
  sensor_acidity = ""
  humidity = ""
  temperature = ""
  acidity = ""
  sensor_temperature2 = ""
  sensor_acidity2 = ""
  setTemperature = ""
  //setTempDown = ""
  setAcidity = ""
  //setAcidityDown = ""
  //buttonDisabled = true;

  highest_acidity = ""
  lowest_acidity = ""
  highest_humidity = ""
  lowest_humidity = ""
  highest_temperature = ""
  lowest_temperature = ""

  ToggleCooler: boolean;
  ToggleCooler2: boolean;
  TogglePhUp: boolean;
  TogglePhDown: boolean;
  ToggleWaterPump: boolean;
  ToggleNutrients: boolean;

  arrData: any;
  arrStatus: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseDb: AngularFireDatabase, public alertCtrl: AlertController, public authProvider: AuthProvider) {
    this.setTemperature = "";
    this.setAcidity = "";
    this.ToggleCooler = false;
    this.ToggleCooler2 = false;
    this.TogglePhUp = false;
    this.TogglePhDown = false;
    this.ToggleWaterPump = false;
    this.ToggleNutrients = false;

    
    this.firebaseDb.list('/Sensor_Data').valueChanges().subscribe(snapshots=>{
    this.arrData = snapshots;
    
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
    //this.setAcidity = this.arrData[6];
    //this.setTemperature = this.arrData[7];

    });

    this.firebaseDb.list('/Sensor_Data/Set').valueChanges().subscribe(snapshots=>{
      this.arrData = snapshots;

      this.sensor_acidity2 = this.arrData[0];
      this.sensor_temperature2 = this.arrData[1];
      
  
    });

    this.firebaseDb.list('/Actuator_Status/Monitor').valueChanges().subscribe(snapshots=>{
      this.arrStatus = snapshots;
      this.ToggleCooler= this.arrStatus[0];
      this.ToggleCooler2 = this.arrStatus[1];
      this.ToggleNutrients = this.arrStatus[2];
      this.ToggleWaterPump = this.arrStatus[3];
      this.TogglePhDown = this.arrStatus[4];
      this.TogglePhUp = this.arrStatus[5];


    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ControlPage');
  }

  notify(){
    this.firebaseDb.list("/Actuator_Status/").update('Monitor', { "Cooler_Status": ""+this.ToggleCooler });
    this.firebaseDb.list("/Actuator_Status/").update('Monitor', { "Cooler_Status_2": ""+this.ToggleCooler2});
    this.firebaseDb.list("/Actuator_Status/").update('Monitor', { "phUp_Status": ""+this.TogglePhUp});
    this.firebaseDb.list("/Actuator_Status/").update('Monitor', { "phDown_Status": ""+this.TogglePhDown }); 
    this.firebaseDb.list("/Actuator_Status/").update('Monitor', { "Waterpump_Status": ""+this.ToggleWaterPump });
    this.firebaseDb.list("/Actuator_Status/").update('Monitor', { "Solution_Status": ""+this.ToggleNutrients});
    
    console.log("Toggled 1: "+ this.ToggleCooler);
    console.log("Toggled 2: "+ this.ToggleCooler2);
    console.log("Toggled 3: "+ this.TogglePhUp);
    console.log("Toggled 4: "+ this.TogglePhDown);
    console.log("Toggled 5: "+ this.ToggleWaterPump);
    console.log("Toggled 6: "+ this.ToggleNutrients);
  }

  setTempUp(){
    this.sensor_temperature2 = ''+ ((parseFloat(this.sensor_temperature2) + 0.5).toFixed(2));
  }

  setTempDown(){
    this.sensor_temperature2 = ''+ ((parseFloat(this.sensor_temperature2) - 0.5).toFixed(2));
  }

  setPhUp(){
    this.sensor_acidity2 = ''+ ((parseFloat(this.sensor_acidity2) + .1).toFixed(2));
  }

  setPhDown(){
    this.sensor_acidity2 = ''+ ((parseFloat(this.sensor_acidity2) - .1).toFixed(2));
  }

  updateSet(){
    //this.firebaseDb.list("/Sensor_Data/").push(this.setAciditiy.toString());
    //this.firebaseDb.list("/Sensor_Data/").push(this.setTemperature.toString());
    /*this.firebaseDb.list('/Sensor_Data', ref => ref.limitToLast(1)).snapshotChanges().map(actions =>{
      return actions.map(action => ({ key: action.key, ...action.payload.val()}));
    }).subscribe(dates => {
      dates.map(date => {
        if (date.key() === "Set_Temperature"){
          
        }
      });
    });*/
    console.log(this.sensor_temperature2);
    this.firebaseDb.list('/Sensor_Data').update("Set", {"Set_Temperature" : this.sensor_temperature2});
    this.firebaseDb.list('/Sensor_Data').update("Set", {"Set_Acidity" : this.sensor_acidity2});
  }

/*  doConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Are you sure you want to set these changes?',
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
            this.updateSet();
            this.Confirmed();
            this.notify();
          }
        }
      ]
    });
    confirm.present()
  }

  Confirmed() {
    let confirmed = this.alertCtrl.create({
      title: '',
      message: 'The changes have been set!',
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
  }*/
  
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
