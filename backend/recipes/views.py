from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from .models import Recipe, Ingredient
from .serializers import RecipeSerializer, IngredientSerializer



class RecipeListCreateView(APIView):

    def get(self, request):
        recipes = Recipe.objects.all()

        search = request.query_params.get('search')
        difficulty = request.query_params.get('difficulty')
        vegetarian = request.query_params.get('vegetarian')
        page_size = request.query_params.get('page_size')

        if search:
            recipes = recipes.filter(name__icontains=search)

        if difficulty:
            recipes = recipes.filter(difficulty=difficulty)

        if vegetarian == 'true':
            recipes = recipes.filter(is_vegetarian=True)

        paginator = PageNumberPagination()

        if page_size:
            paginator.page_size = int(page_size)

        page = paginator.paginate_queryset(recipes, request)

        serializer = RecipeSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)

    def post(self, request):
        serializer = RecipeSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RecipeDetailView(APIView):

    def get_object(self, pk):
        try:
            return Recipe.objects.get(pk=pk)
        except Recipe.DoesNotExist:
            return None

    def get(self, request, pk):
        recipe = self.get_object(pk)

        if recipe is None:
            return Response(
                {"detail": "Recipe not found."}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = RecipeSerializer(recipe)
        return Response(serializer.data)

    def put(self, request, pk):
        recipe = self.get_object(pk)

        if recipe is None:
            return Response(
                {"detail": "Recipe not found."}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = RecipeSerializer(recipe, data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        recipe = self.get_object(pk)

        if recipe is None:
            return Response(
                {"detail": "Recipe not found."}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = RecipeSerializer(recipe, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        recipe = self.get_object(pk)

        if recipe is None:
            return Response(
                {"detail": "Recipe not found."}, status=status.HTTP_404_NOT_FOUND
            )

        recipe.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class IngredientListView(APIView):

    def get(self, request):
        ingredients = Ingredient.objects.all()
        serializer = IngredientSerializer(ingredients, many=True)
        return Response(serializer.data)