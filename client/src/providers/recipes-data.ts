import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RecipesData {
  data: any;
  ingredients = [];
  excludedIngredients = [];

  constructor(private http: Http) {
    this.data = null;
  }

  load() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http.get('assets/data/recipes.json')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(data)
        });
    });
  }

  getAll(excludeIngredients = []) {
    return this.load().then(data => {

      data.forEach(recipe => {
        this.filterRecipe(recipe, excludeIngredients);
      });

      return data;
    });
  }

  filterRecipe(recipe, excludeIngredients) {
    let matchesIngredients = false;

    recipe.ingredients.forEach(ingredient => {
      if(excludeIngredients.indexOf(ingredient.name) > -1) {
        matchesIngredients = true;
      }
    });

    recipe.hide = matchesIngredients;
  }

  getIngredients() {
    return this.load().then( data => {
      let ingredients = [];
      data.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
          if(ingredients.indexOf(ingredient.name) === -1) {
            ingredients.push(ingredient.name);
          }
        });
      });
      return ingredients;
    });
  }

}
