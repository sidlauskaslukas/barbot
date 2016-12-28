import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/flatMap';

@Injectable()
export class RecipesData {
  data: Array<any> = [];
  ingredients: any = {};

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

}
