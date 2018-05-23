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
  
  createNewRecipe() {
    console.log("Total number of existing recipes  = ", this.recipesData.recipes.length );
    let new_id = this.recipesData.recipes
      .map(recipe => recipe.id)
      .sort( (a, b) => b - a )[ 0 ] || 0;
    new_id = new_id + 1;
    console.log("Creating New Recipe with id = ", new_id );
    this.recipes.push({id: new_id , name: "NEW ITEM  !!!", image:"cape_codder_small.png", description: "", ingredients:[]})
    var indexOfTheOneJustCreated = this.recipesData.recipes.findIndex(item => item.id == new_id);
    var recipe = this.recipesData.recipes[indexOfTheOneJustCreated];
    this.nav.push(SettingsRecipePage, {recipe});
  }

}
