import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SettingsRecipePage } from '../settings-recipe/settings-recipe';
import { RecipesData } from '../../providers/recipes-data';

@Component({
  selector: 'page-settings-recipes',
  templateUrl: 'settings-recipes.html'
})
export class SettingsRecipesPage {
  recipes:Array<any> = [];

  constructor(public nav: NavController,
              private recipesData: RecipesData
  ) {}

  ngAfterViewInit() {
    this.recipes = this.recipesData.recipes.sort((a, b) => a.name < b.name ? -1 : 1);
  }

  presentRecipe(recipe) {
    this.nav.push(SettingsRecipePage, {recipe});
  }

}
