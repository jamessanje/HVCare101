import { Component, Injectable } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

@Injectable()
export class HomePage {
  arrData = []
  crop1 = ""
  crop2 = ""
  crop3 = ""

  constructor(public navCtrl: NavController, public afd: AngularFireDatabase, public alertCtrl: AlertController) {
    this.crop1 = "";
    this.crop2 = "";
    this.crop3 = "";



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

  

  change(value){
    this.crop1 = value.toString();
  }
  change2(value){
    this.crop2 = value.toString();
  }
  change3(value){
    this.crop3 = value.toString();
  }
  update(){
    console.log(this.crop1);
    this.afd.list("/Crop_Data/Crop_Name/").remove();
    this.afd.list("/Crop_Data/Crop_Name/").push(this.crop1);
    this.afd.list("/Crop_Data/Crop_Name/").push(this.crop2);
    this.afd.list("/Crop_Data/Crop_Name/").push(this.crop3);
  }

}
