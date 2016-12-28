import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { RecipesData } from '../../providers/recipes-data';

@Component({
  selector: 'page-recipes-filter',
  templateUrl: 'recipes-filter.html'
})
export class RecipesFilterPage {

  ingredients: Array<{name: string, isChecked: boolean}> = [];

  constructor(
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private recipesData: RecipesData
  ) {
    let excludedIngredients = this.navParams.data;

    // this.recipesData.getIngredients().then((ingredientNames: string[]) => {
    //   ingredientNames.forEach(ingredientName => {
    //     this.ingredients.push({
    //       name: ingredientName,
    //       isChecked: (excludedIngredients.indexOf(ingredientName) === -1)
    //     });
    //   });
    // });
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  applyFilters() {
    let excludedIngredients = this.ingredients.filter(ingredient => !ingredient.isChecked).map(ingredient => ingredient.name);
    this.viewCtrl.dismiss(excludedIngredients);
  }

}
