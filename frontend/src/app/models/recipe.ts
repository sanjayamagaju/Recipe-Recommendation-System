export interface RecipeModel {
  id?: number;
  name: string;
  description: string;
  cooking_time: number;
  difficulty: string;
  is_vegetarian: boolean;
  ingredients: IngredientModel[];
}

export interface IngredientModel {
  id: number;
  name: string;
}

export interface RecipeResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: RecipeModel[];
}

export interface RecommendationModel {
  recipe: RecipeModel;
  score: number;
  match_percentage: number;
}
