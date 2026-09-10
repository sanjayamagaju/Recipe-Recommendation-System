import { Routes } from '@angular/router';
import {RecipeList} from './components/recipe-list/recipe-list';
import {RecipeDetails} from './components/recipe-details/recipe-details';

export const routes: Routes = [
  {
    path: '',
    component: RecipeList
  },
  {
    path: 'recipes/:id',
    component: RecipeDetails
  }
];
