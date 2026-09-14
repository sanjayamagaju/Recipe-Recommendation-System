import {Component, OnInit} from '@angular/core';
import {RecipeModel, RecommendationModel} from '../../models/recipe';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {RecipeService} from '../../services/recipe.service';
import {RecommendationList} from '../../shared/recommendation-list/recommendation-list';

@Component({
  selector: 'app-recipe-details',
  imports: [
    RouterLink,
    RecommendationList
  ],
  templateUrl: './recipe-details.html',
  styleUrl: './recipe-details.css',
})
export class RecipeDetails implements OnInit {

  recipe?: RecipeModel;
  ingredientIds: number[] = [];

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
    this._route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));

      if (!id) {
        this.goBackHome();
        return;
      }

      this._recipeService.getRecipe(id).subscribe({
        next: res => {
          this.recipe = res;

          this.ingredientIds = res.ingredients.map(
            item => item.id
          );
        },
        error: err => {
          this.goBackHome();
        }
      })
    })
  }

  goBackHome(): void {
    this._router.navigate(['/']);
  }

}
