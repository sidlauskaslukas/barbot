import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-settings-ingredient',
  templateUrl: 'settings-ingredient.html'
})
export class SettingsIngredientPage {
  pageTitle: string = '';
  ingredientKeys = [ 'name', 'coordinate', 'hold', 'wait' ];
  ingredient;
  isNew: boolean = false;
  newIngredientTmpl = {
    name: '',
    coordinate: '',
    hold: 1000,
    wait: 1000,
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

    this.ingredient = this.navParams.get('ingredient');

    if (!this.ingredient) {
      this.isNew = true;
      this.ingredient = this.newIngredientTmpl;
    }

    this.ingredient = JSON.parse(JSON.stringify(this.ingredient));

    this.pageTitle = this.isNew ? 'New Ingrediant' : `Edit "${this.ingredient.name}"`;
  }
}
