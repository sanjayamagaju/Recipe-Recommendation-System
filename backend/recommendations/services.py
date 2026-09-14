from recipes.models import Recipe


def get_recommendations(ingredient_ids, recipe_id):
    recipes = Recipe.objects.exclude(id=recipe_id).prefetch_related('ingredients')
    recommendations = []
    selected_ingredients = set(ingredient_ids)

    for recipe in recipes:
        recipe_ingredient_ids = set(recipe.ingredients.values_list('id', flat=True))

        matching_ingredients = (recipe_ingredient_ids & selected_ingredients)

        if matching_ingredients:
            score = len(matching_ingredients) / len(ingredient_ids)
            recommendations.append({
                'recipe': recipe,
                'score': round(score, 2),
                'match_percentage': round(score * 100),
            })

    recommendations.sort(key=lambda item: item['score'], reverse=True)
    return recommendations[:5]
