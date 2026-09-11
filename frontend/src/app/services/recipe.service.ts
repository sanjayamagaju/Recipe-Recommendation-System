import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IngredientModel, RecipeModel, RecipeResponse } from '../models/recipe';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apiUrl: string = `${environment.apiUrl}/recipes/`;

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<RecipeModel[]> {
    return this.http.get<RecipeModel[]>(`${this.apiUrl}`);
  }

  getRecipe(id: number) {
    return this.http.get<RecipeModel>(`${this.apiUrl}${id}/`);
  }

  getIngredients(): Observable<IngredientModel[]> {
    return this.http.get<IngredientModel[]>(`${environment.apiUrl}/ingredients/`);
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

  getFilteredRecipes(search?: string, difficulty?: string, vegetarian?: boolean, page: number = 1, pageSize: number = 5) {
    let params: any = {
      page: page,
      page_size: pageSize
    };

    if (search) {
      params.search = search;
    }

    if (difficulty) {
      params.difficulty = difficulty;
    }

    if (vegetarian) {
      params.vegetarian = vegetarian;
    }
    
    return this.http.get<RecipeResponse>(this.apiUrl, { params });
  }
}
