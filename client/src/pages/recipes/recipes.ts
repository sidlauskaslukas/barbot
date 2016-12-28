import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Dialogs, BluetoothSerial } from 'ionic-native';

import { RecipesData } from '../../providers/recipes-data';
import { SettingsPage } from '../settings/settings';
import { RecipesFilterPage } from '../recipes-filter/recipes-filter';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html'
})
export class RecipesPage {

  recipes = [];
  command = '';
  excludeIngredients = [];

  constructor(
    public nav: NavController,
    public modal: ModalController,
    public navParams: NavParams,
    private recipesData: RecipesData) {

    this.recipesData.load();

  }

  ngAfterViewInit() {
    this.updateRecipes();
  }

  updateRecipes() {
    this.recipesData.getAll(this.excludeIngredients).then(data => {
      this.recipes = data;
    });
  }

  presentSettings() {
    this.nav.push(SettingsPage);
  }

  presentFilter() {
    let modalInstance = this.modal.create(RecipesFilterPage, this.excludeIngredients);

    modalInstance.onDidDismiss((data: any[]) => {
      if (data) {
        this.excludeIngredients = data;
        this.updateRecipes();
      }
    });

    modalInstance.present();
  }

  lucky() {
    let filteredRecipes = this.recipes.filter(r => { return !r.hide});
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
              this.send(recipe.command);
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

  send(command) {
    BluetoothSerial.write(command + '\n').then(
      result => {
        console.log('Command has been successfuly sent to Barbot.');
      },
      error => {
        console.log('Command has not been sent to Barbot.');
      }
    );
    if(this.command) this.command = '';
  }

}
