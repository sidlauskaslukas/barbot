import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RecipesData {
  data: any;

  constructor(private http: Http) {
    this.data = null;
  }

  load() {
    if(this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http.get('data/recipes.json')
        .map(res => res.json())
        .subscribe(data => {
          this.data = this.processData(data);
          resolve(this.data);
        });
    });
  }

  processData(data) {
    data.forEach(recipe => {
      this.processRecipe(recipe);
    });

    return data;
  }

  processRecipe(recipe) {
    let command = [];
    let description = [];

    recipe.ingredients.forEach(ingredient => {
      let amount = ingredient.amount / 20;
      let durations = ingredient.durations;
      command.push(ingredient.coordinate);
      command.push('F' + amount + ' H' + durations.hold + ' W' + durations.wait);
      description.push(ingredient.name);
    });
    
    command.push('H');

    while(command.length !== 30) {
      command.push('0');
    }

    recipe.command = command.join(',');
    recipe.description = description.join(', ');
  }

  getAll() {
    return this.load().then(data => {
      return data;
    });
  }

  // getIngredients() {
  //   return this.load().then(data => {
  //     let ingredients = [];
  //     data.forEach(recipe => {
  //       recipe.ingredients.forEach(ingredient => {
  //         if(ingredients.indexOf(ingredient.name) === -1) {
  //           ingredients.push(ingredient.name);
  //         }
  //       });
  //     });
  //     return ingredients;
  //   });
  // }

}