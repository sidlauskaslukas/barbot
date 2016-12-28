import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RecipesData } from '../../providers/recipes-data';

@Component({
  selector: 'page-settings-ingredients',
  templateUrl: 'settings-ingredients.html'
})
export class SettingsIngredientsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public recipesData: RecipesData
  ) {

  }

  getIngredientDescription(ingredient): string {
    return [ 'coordinate', 'hold', 'wait' ]
      .map( attrKey => {
        return `${attrKey}: ${ingredient[ attrKey ]}`;
      })
      .join(' ');
  }
}
