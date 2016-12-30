import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RecipesData } from '../../providers/recipes-data';

@Component({
  selector: 'page-settings-recipe',
  templateUrl: 'settings-recipe.html'
})
export class SettingsRecipePage {
  pageTitle: string = '';
  isNew: boolean = false;
  ingredients: Array<any> = [];
  recipe = {
    id: '',
    name: '',
    image: '',
    description: '',
    hold: '',
    wait: '',
    ingredients: []
  };

  constructor(public nav: NavController, public navParams: NavParams, private recipesData: RecipesData) {
    this.init();
  }

  init() {
    this.recipe = this.navParams.get('recipe');
    this.recipe = JSON.parse(JSON.stringify(this.recipe));

    if(!this.recipe) {
      this.isNew = true;
    }

    this.pageTitle = this.isNew ? 'New Recipe' : `Edit "${this.recipe.name}"`;
  }

  save(recipe) {
    this.recipesData.saveRecipe(recipe);
    this.nav.pop();
  }

}
