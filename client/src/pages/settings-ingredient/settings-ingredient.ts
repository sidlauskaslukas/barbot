import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-settings-ingredient',
  templateUrl: 'settings-ingredient.html'
})
export class SettingsIngredientPage {
  ingredientKeys = [ 'coordinate', 'hold', 'wait' ];
  ingredient;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

    this.ingredient = JSON.parse(JSON.stringify(this.navParams.get('ingredient')));

    console.log('this.ingredient', this.ingredient);
  }

}
