import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RecipesData {
  data: Array<any> = [];
  ingredients: Array<any> = [];

  constructor(private http: Http) {
  }

  fetch(file) {
    return this.http.get(`assets/data/${file}.json`)
      .map(res => res.json());
  }

  init() {
    return this.fetch('recipes')
      .flatMap( recipesData => {
        this.data = recipesData;
        return this.fetch('ingredients');
      })
      .flatMap( ingredientsData => {
        this.ingredients = ingredientsData;
        return Observable.of('all good');
      })
      .toPromise();
  }

  findIngredientByCoordinate(coordinate: string) {
    let ingredient = this.ingredients.find(ingredient => {
      return ingredient.coordinate === coordinate;
    });
    return ingredient;
  }

}
