import {Component, Input, SimpleChanges} from '@angular/core';
import {RecipeModel, RecommendationModel} from '../../models/recipe';
import {RecipeService} from '../../services/recipe.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-recommendation-list',
  imports: [
    RouterLink
  ],
  templateUrl: './recommendation-list.html',
  styleUrl: './recommendation-list.css',
})
export class RecommendationList {
  @Input() recipeId?: number;
  @Input() ingredientIds: number[] = [];

  recommendations: RecommendationModel[] = [];

  constructor(
    private _recipeService: RecipeService,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['recipeId'] || changes['ingredientIds']) {
      this.loadRecommendations();
    }
  }

  loadRecommendations(): void {
    if (!this.recipeId || this.ingredientIds.length === 0) {
      this.recommendations = [];
      return;
    }

    this._recipeService.getRecommendations(this.recipeId, this.ingredientIds).subscribe({
      next: res => {
        this.recommendations = res;
      }
    })
  }
}
