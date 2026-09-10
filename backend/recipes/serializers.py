from rest_framework import serializers
from .models import Recipe, Ingredient


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = '__all__'


class RecipeSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True, read_only=True)

    ingredient_ids = serializers.PrimaryKeyRelatedField(
        queryset=Ingredient.objects.all(),
        many=True,
        write_only=True,
        source='ingredients',
    )

    class Meta:
        model = Recipe
        fields = [
            'id',
            'name',
            'description',
            'cooking_time',
            'difficulty',
            'is_vegetarian',
            'ingredients',
            'ingredient_ids',
        ]
