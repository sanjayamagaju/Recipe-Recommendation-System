import {Component, OnInit} from '@angular/core';
import {RecipeModel} from '../../models/recipe';
import {ActivatedRoute, Router} from '@angular/router';
import {RecipeService} from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-details',
  imports: [],
  templateUrl: './recipe-details.html',
  styleUrl: './recipe-details.css',
})
export class RecipeDetails implements OnInit {

  recipe?: RecipeModel;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _recipeService: RecipeService,
  ) {
  }

  ngOnInit() {
    this.loadRecipeDetail();
  }

  loadRecipeDetail() {
    const id = Number(this._route.snapshot.paramMap.get('id'));

    if (!id) {
      this.goBackHome();
      return;
    }

    this._recipeService.getRecipe(id).subscribe({
      next: res => {
        this.recipe = res;
      },
      error: err => {
        this.goBackHome();
      }
    })
  }

  goBackHome(): void {
    this._router.navigate(['/']);
  }

}
