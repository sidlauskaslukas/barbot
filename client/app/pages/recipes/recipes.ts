import {Component} from '@angular/core';
import {NavController, Modal} from 'ionic-angular';
import {Dialogs, BluetoothSerial, Splashscreen} from 'ionic-native';
import {RecipesData} from '../../providers/recipes/recipes';
import {RecipesFilterPage} from '../recipes-filter/recipes-filter';

@Component({
  templateUrl: 'build/pages/recipes/recipes.html',
})
export class RecipesPage {

  recipes = [];
  command = '';
  excludeIngredients = [];

  constructor(
    private nav: NavController, 
    private recipesData: RecipesData
  ) {
    this.nav = nav;
    recipesData.load();
  }

  ngAfterViewInit() {
  	this.updateRecipes();
  }

  updateRecipes() {
  	this.recipesData.getAll(this.excludeIngredients).then(data => {
  		this.recipes = data;
  	});
  }

  presentFilter() {
    let modal = Modal.create(RecipesFilterPage, this.excludeIngredients);
    this.nav.present(modal);

    modal.onDismiss((data: any[]) => {
      if(data) {
        this.excludeIngredients = data;
        this.updateRecipes();
      }
    });
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