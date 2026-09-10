from django.urls import path

from .views import RecipeListCreateView, RecipeDetailView, IngredientListView

urlpatterns = [
    path('recipes/', RecipeListCreateView.as_view()),
    path('recipes/<int:pk>/', RecipeDetailView.as_view()),
    path('ingredients/', IngredientListView.as_view()),
]