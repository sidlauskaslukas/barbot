import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RecipesData } from '../../providers/recipes-data';
import { SettingsIngredientPage } from '../settings-ingredient/settings-ingredient';

@Component({
  selector: 'page-settings-ingredients',
  templateUrl: 'settings-ingredients.html'
})
export class SettingsIngredientsPage {

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public recipesData: RecipesData
  ) {

  }

  toggleIngredientState(ingredient) {
    ingredient.disabled = !ingredient.disabled;
    this.recipesData.saveDataToLS();
  }

  navIngredientPage(ingredient) {
    this.nav.push(SettingsIngredientPage, {ingredient});
  }

  getIngredientDescription(ingredient): string {
    return [ 'coordinate', 'hold', 'wait' ]
      .map( attrKey => {
        return `${attrKey}: ${ingredient[ attrKey ]}`;
      })
      .join(' ');
  }
}
