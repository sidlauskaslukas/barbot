import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RecipesData {
  data: Array<any> = [];

  constructor(private http: Http) {
  }

  init() {
    return this.http.get('assets/data/recipes.json')
      .map(res => {
        let resAsJSON = res.json();
        this.data = resAsJSON;
        return resAsJSON
      })
      .toPromise();
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
    let ingredients = [];
    this.data.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        if(ingredients.indexOf(ingredient.name) === -1) {
          ingredients.push(ingredient.name);
        }
      });
    });
    return ingredients;
  }

}
