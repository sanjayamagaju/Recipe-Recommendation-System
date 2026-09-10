import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {IngredientModel, RecipeModel} from '../models/recipe';


@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apiUrl: string = 'http://localhost:8000/api/recipes/';

  constructor(
    private http: HttpClient
  ) {
  }

  getRecipes(): Observable<RecipeModel[]> {
    return this.http.get<RecipeModel[]>(`${this.apiUrl}`);
  }

  getRecipe(id: number) {
    return this.http.get<RecipeModel>(`${this.apiUrl}${id}/`);
  }

  getIngredients(): Observable<IngredientModel[]> {
    return this.http.get<IngredientModel[]>('http://localhost:8000/api/ingredients/');
  }

  createRecipe(payload: RecipeModel) {
    return this.http.post<RecipeModel>(`${this.apiUrl}`, payload);
  }

  updateRecipe(id: number, payload: RecipeModel) {
    return this.http.put<RecipeModel>(`${this.apiUrl}${id}/`, payload);
  }

  deleteRecipe(id: number) {
    return this.http.delete<RecipeModel>(`${this.apiUrl}${id}/`);
  }
}
