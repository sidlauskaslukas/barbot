import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RecipesData {
  recipes: Array<any> = [];
  ingredients: any = {};
  lsDataKeys = [ 'recipes', 'ingredients' ];
  ls = localStorage;

  constructor(private http: Http) {
  }

  fetch(file) {
    return this.http.get(`assets/data/${file}.json`)
      .map(res => res.json());
  }

  init() {
    let shouldCopyPredefinedData;

    shouldCopyPredefinedData = this.lsDataKeys.some( datasetKey =>
      this.ls.getItem(datasetKey) === null
    );

    return !shouldCopyPredefinedData ? this.loadFromLS() : this.loadFromJSON();
  }

  loadFromLS() {
    this.lsDataKeys.forEach( lsDataKey => {
      this[ lsDataKey ] = JSON.parse( this.ls.getItem(lsDataKey) );
    });

    return new Promise( resolve => resolve('all good') );
  }

  loadFromJSON() {
    return this.fetch('recipes')
      .flatMap( recipesData => {
        this.recipes = recipesData;
        return this.fetch('ingredients');
      })
      .flatMap( ingredientsData => {
        this.ingredients = ingredientsData;

        this.saveDataToLS();

        return Observable.of('all good');
      })
      .toPromise();
  }

  saveDataToLS() {
    this.lsDataKeys.forEach( lsDataKey => {
      this.ls.setItem(lsDataKey, JSON.stringify( this[ lsDataKey]) );
    });
  }

  generateNewIngrediantId() {
    let newId = this.ingredients
      .map(ingredient => ingredient.id)
      .sort( (a, b) => b - a )[ 0 ] || 0;

    return newId + 1;
  }

  saveIngrediant(modifiedIngredient) {

    let ingredientToModify = this.ingredients.find( ingredient =>
      ingredient.id == modifiedIngredient.id
    );

    // Modify
    if (ingredientToModify) {
      Object.assign(ingredientToModify, modifiedIngredient);
    // Add new one
    } else {
      this.ingredients.unshift(modifiedIngredient);
    }

    this.saveDataToLS();
  }

  getRecipeDescription(recipe): string {
    let description: Array<any> = [];

    recipe.ingredients.map(ingredient => ingredient.id).forEach(id => {
      var ingredient = this.findIngredientById(id);
      description.push(ingredient.name);
    });

    return description.join( ', ') || '';
  }

  findIngredientById(id) {
    let ingredient = this.ingredients.find(ingredient => {
      return ingredient.id === parseInt(id);
    });
    return ingredient;
  }

  findIngredientByCoordinate(coordinate: string) {
    let ingredient = this.ingredients.find(ingredient => {
      return ingredient.coordinate === coordinate;
    });
    return ingredient;
  }

  saveRecipe(modifiedRecipe) {
    let recipeToModify = this.recipes.find(
      recipe => recipe.id === modifiedRecipe.id
    );

    if(recipeToModify) {
      Object.assign(recipeToModify, modifiedRecipe);
    } else {
      this.recipes.unshift(modifiedRecipe);
    }

    this.saveDataToLS();
  }

}
