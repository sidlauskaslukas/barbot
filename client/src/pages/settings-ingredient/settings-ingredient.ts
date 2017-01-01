import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RecipesData } from '../../providers/recipes-data';


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
    public nav: NavController,
    public navParams: NavParams,
    public recipesData: RecipesData
  ) {

    this.ingredient = this.navParams.get('ingredient');

    if (!this.ingredient) {
      this.isNew = true;
      this.ingredient = Object.assign({}, this.newIngredientTmpl);
      this.ingredient.id = this.recipesData.generateNewIngrediantId();
    }

    this.ingredient = JSON.parse(JSON.stringify(this.ingredient));

    this.pageTitle = this.isNew ? 'New Ingrediant' : `Edit "${this.ingredient.name}"`;
  }

  saveIngrediant() {
    this.recipesData.saveIngrediant(this.ingredient);
    this.nav.pop();
  }
}
