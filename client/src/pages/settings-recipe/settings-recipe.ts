import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';

import { AddIngredientPage } from '../add-ingredient/add-ingredient';
import { RecipesData } from '../../providers/recipes-data';

@Component({
  selector: 'page-settings-recipe',
  templateUrl: 'settings-recipe.html'
})
export class SettingsRecipePage {
  pageTitle: string = '';
  isNew: boolean = false;
  recipe = {
    id: '',
    name: '',
    image: '',
    description: '',
    hold: '',
    wait: '',
    ingredients: []
  };

  constructor(public nav: NavController,
              public navParams: NavParams,
              private recipesData: RecipesData,
              public modalCtrl: ModalController) {
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

  addIngredient() {
    let addIngredientModal = this.modalCtrl.create(AddIngredientPage, {recipeTitle: this.recipe.name});
    addIngredientModal.onDidDismiss(ingredient => {
      if(ingredient) this.recipe.ingredients.push({id: ingredient.id, amount: 40});
    });
    addIngredientModal.present();
  }

  removeIngredient(index) {
    this.recipe.ingredients.splice(index,1);
  }

  deleteCurrent(recipe){
    var index = this.recipesData.recipes.findIndex(item => item.id == this.recipe.id);
    this.recipesData.recipes.splice(index,1);
    this.recipesData.saveDataToLS();
    this.nav.pop();
  }


}
