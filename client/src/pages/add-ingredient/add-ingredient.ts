import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { RecipesData } from '../../providers/recipes-data';

@Component({
  selector: 'page-add-ingredient',
  templateUrl: 'add-ingredient.html'
})
export class AddIngredientPage {
  recipeTitle: string = "";

  constructor(public viewCtrl: ViewController,
              public navParams: NavParams,
              private recipesData: RecipesData) {
    this.recipeTitle = navParams.get('recipeTitle');
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  add(ingredient) {
    this.viewCtrl.dismiss(ingredient);
  }

}
