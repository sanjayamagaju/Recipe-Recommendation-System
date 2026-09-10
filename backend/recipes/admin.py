from django.contrib import admin

from .models import Recipe, Ingredient


# Register your models here.

# admin.site.register(Recipe)

@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'cooking_time',
        'difficulty',
        'is_vegetarian',
    )

    list_filter = (
        'difficulty',
        'is_vegetarian'
    )

    search_fields = (
        'name',
        'description',
    )