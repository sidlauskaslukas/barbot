import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-settings-recipes',
  templateUrl: 'settings-recipes.html'
})
export class SettingsRecipesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsRecipesPage');
  }

}
