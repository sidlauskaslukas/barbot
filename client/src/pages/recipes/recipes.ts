import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Dialogs, BluetoothSerial } from 'ionic-native';

import { RecipesData } from '../../providers/recipes-data';
import { SettingsPage } from '../settings/settings';
// import { RecipesFilterPage } from '../recipes-filter/recipes-filter';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html'
})
export class RecipesPage {

  _searchInput: string = '';
  command = '';

  constructor(
    public nav: NavController,
    public modal: ModalController,
    public navParams: NavParams,
    private recipesData: RecipesData) {

  }

  get searchInput() {
    return this._searchInput.trim().toLowerCase();
  }

  set searchInput(val: string) {
    this._searchInput = val;
  }

  getRecipeDescription(recipe): string {
    return recipe.ingredients.map(ingredient => ingredient.name).join( ', ') || '';
  }

  matchesCompexSearch(recipe): boolean {
    let val = this.searchInput;
    return val === '' ? true : (
      this.matchNameSearch(recipe, val) || this.matchIngredientsSearch(recipe, val)
    );
  }

  matchNameSearch(recipe, searchString: string): boolean {
    return recipe.name.toLowerCase().search(searchString) !== -1;
  }

  matchIngredientsSearch(recipe, searchString: string): boolean {
    let searchForIngredients = searchString
      .replace(/  +/g, ' ')
      .replace(/, /g, ',')
      .split(',');

    return searchForIngredients.every( searchIngredient => {
      return recipe.ingredients.find( recipeIngredient => {
        return recipeIngredient.name.toLowerCase().search(searchIngredient) !== -1;
      })
    });
  }

  presentSettings() {
    this.nav.push(SettingsPage);
  }

  lucky() {
    let filteredRecipes = this.recipesData.recipes.filter(r => { return !r.hide});
    let recipe = filteredRecipes[Math.floor(Math.random() * filteredRecipes.length)];
    this.serve(recipe);
  }

  serve(recipe) {
    Dialogs.confirm('Please confirm your choice: ' + recipe.name, 'Confirm your choice', ['Confirm', 'Cancel']).then(
      selection => {
        if(selection === 1) {
          BluetoothSerial.isConnected().then(
            status => {
              console.log('Connected to Barbot. Sending a command.');
              this.send(recipe);
            },
            error => {
              Dialogs.alert('Make sure you\'re connected to Barbot.', 'Not connected', 'OK');
              console.log('Not connected to Barbot.');
            }
          );
        }
      }
    );
  }

  send(recipe) {

    let commands = [];
    let commandString = '';

    recipe.ingredients.forEach( recipeIngredientData => {

      let ingredientData = this.recipesData.ingredients
        .find( ingredient => ingredient.name === recipeIngredientData.name );

      commands.push(ingredientData.coordinate);
      commands.push(`F${recipeIngredientData.amount / 20} H${ingredientData.hold} W${ingredientData.wait}`);

    });

    commands.push('H');

    while (commands.length !== 30) commands.push('0');

    commandString = commands.join(',') + '\n';

    console.log('commandString ', commandString);

    BluetoothSerial.write(commandString).then(
      result => {
        console.log('Command has been successfuly sent to Barbot.');
      },
      error => {
        console.log('Command has not been sent to Barbot.');
      }
    );

  }

}
