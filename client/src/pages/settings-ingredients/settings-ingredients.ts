import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-settings-ingredients',
  templateUrl: 'settings-ingredients.html'
})
export class SettingsIngredientsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsIngredientsPage');
  }

}
