import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Api
import { edamamEnvironment } from 'asd/environment/recipes';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private http: HttpClient) { }

  URL = edamamEnvironment.URL;
  APP_ID = edamamEnvironment.APP_ID;
  APP_KEY = edamamEnvironment.APP_KEY;

  getRecipes(query: any) {
    return this.http.get(`${this.URL}q=${query}&app_id=${this.APP_ID}&app_key=${this.APP_KEY}`);
  }



    /*subscribeToQuery(query: any) {
    this.getRecipes(query).subscribe((data) =>{ 
      /*this.recipes = [
      {
        recipe: {
          label: anyData.hits.recipe.label,
          url: anyData.hits.recipe.url,
          yield: anyData.hits.recipe.yield,
          //dietLabels: [],
          //healthLables: [],
          //cautions: anyData.hits.recipe.cautions,
          ingredientLines: anyData.hits.recipe.ingredientLines
        }
      }
    ];
    })
  }*/


}
